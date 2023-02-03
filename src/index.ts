import fs from "fs";
import zlib from "zlib";

import { getGzippedFiles, removeExtensionFromFileName, transformJSON, writeToFile } from "./utils";

// Get all .gz files in input folder
const fileNames: string[] = getGzippedFiles("input");

fileNames.forEach((fileName: string) => {
  // Read the incoming gzipped JSON file
  fs.readFile("input/" + fileName, (err, data) => {
    if (err) throw err;
  
    zlib.gunzip(data, (err, result) => {
      if (err) throw err;
  
      let inputJSON = JSON.parse(result.toString());
      let transformedArray = transformJSON(inputJSON);
      writeToFile("output/" + removeExtensionFromFileName(fileName), transformedArray);
    });
  });
})
