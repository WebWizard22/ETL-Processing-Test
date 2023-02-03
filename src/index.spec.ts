import fs from "fs";

import { transformJSON, writeToFile } from "./utils";

describe("transformJSON", () => {
  it("should return an array of transformed objects", () => {
    let inputJSON = {
      ts: 1234567890,
      u: "https://www.test.com/products/productA.html?a=5435&b=test#reviews",
      e: [
        {
          id: 1,
          name: "Event 1"
        },
        {
          id: 2,
          name: "Event 2"
        }
      ]
    };

    let expectedArray = [
      {
        timestamp: 1234567890,
        url_object: {
          domain: "www.test.com",
          path: "/products/productA.html",
          query_object: {
            a: "5435",
            b: "test"
          },
          hash: "#reviews"
        },
        ec: {
          id: 1,
          name: "Event 1"
        }
      },
      {
        timestamp: 1234567890,
        url_object: {
          domain: "www.test.com",
          path: "/products/productA.html",
          query_object: {
            a: "5435",
            b: "test"
          },
          hash: "#reviews"
        },
        ec: {
          id: 2,
          name: "Event 2"
        }
      }
    ];

    let resultArray = transformJSON(inputJSON);
    expect(resultArray).toEqual(expectedArray);
  });
});

describe("writeToFile", () => {
  it("should write transformed objects to a file", () => {
    let transformedArray = [
      {
        timestamp: 1234567890,
        url_object: {
          domain: "www.test.com",
          path: "/products/productA.html",
          query_object: {
            a: "5435",
            b: "test"
          },
          hash: "#reviews"
        },
        ec: {
          id: 1,
          name: "Event 1"
        }
      },
      {
        timestamp: 1234567890,
        url_object: {
          domain: "www.test.com",
          path: "/products/productA.html",
          query_object: {
            a: "5435",
            b: "test"
          },
          hash: "#reviews"
        },
        ec: {
          id: 2,
          name: "Event 2"
        }
      }
    ];

    writeToFile("test-output.json", transformedArray);
    let result = fs.readFileSync("test-output.json", "utf8");
    let expected = JSON.stringify(transformedArray);

    expect(result).toEqual(expected);
  });
});
