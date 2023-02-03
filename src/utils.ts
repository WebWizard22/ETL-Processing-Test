import fs from "fs";
import { InputJSON, OutputJSON } from "./types";
import URL from "url";

// Function to transform the incoming JSON
export function transformJSON(inputJSON: InputJSON): OutputJSON[] {
  let outputArray: OutputJSON[] = [];

  for (let event of inputJSON.e) {
    let url = URL.parse(inputJSON.u, true);

    let output: OutputJSON = {
      timestamp: inputJSON.ts,
      url_object: {
        domain: url.hostname,
        path: url.pathname,
        query_object: url.query,
        hash: url.hash
      },
      ec: event
    };

    outputArray.push(output);
  }

  return outputArray;
}

// Function to write transformed JSON objects to a file
export function writeToFile(fileName: string, transformedArray: OutputJSON[]) {
  let data = "[";
  let size = 1;

  for (let obj of transformedArray) {
    let str = JSON.stringify(obj);

    // If size exceeds 8KB, write the current data to file and reset the data and size variables
    if (size + str.length > 8 * 1024) {
      data += "]";
      writeFileWithUniqueName(fileName, data);
      data = "[";
      size = 1;
    }

    if (size > 1) data += ",";

    data += str;
    size += str.length;
  }

  // Write the remaining data to file
  data += "]";
  writeFileWithUniqueName(fileName, data);
}

// Get Gzipped file names in a folder
export function getGzippedFiles(folderPath: string): string[] {
  return fs.readdirSync(folderPath).filter(file => file.endsWith('.gz'));
}

export function removeExtensionFromFileName(fileName: string): string {
  return fileName.substring(0, fileName.lastIndexOf('.'));
}

export function writeFileWithUniqueName(fileName: string, content: string): void {
  let uniqueFileName = fileName;
  let index = 1;
  while (fs.existsSync(uniqueFileName)) {
    uniqueFileName = fileName.substring(0, fileName.lastIndexOf('.')) + `(${index})` + fileName.substring(fileName.lastIndexOf('.'));
    index++;
  }
  fs.writeFileSync(uniqueFileName, content, "utf8");
}