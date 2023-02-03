"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFileWithUniqueName = exports.removeExtensionFromFileName = exports.getGzippedFiles = exports.writeToFile = exports.transformJSON = void 0;
var fs_1 = __importDefault(require("fs"));
var url_1 = __importDefault(require("url"));
// Function to transform the incoming JSON
function transformJSON(inputJSON) {
    var outputArray = [];
    for (var _i = 0, _a = inputJSON.e; _i < _a.length; _i++) {
        var event = _a[_i];
        var url = url_1.default.parse(inputJSON.u, true);
        var output = {
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
exports.transformJSON = transformJSON;
// Function to write transformed JSON objects to a file
function writeToFile(fileName, transformedArray) {
    var data = "[";
    var size = 1;
    for (var _i = 0, transformedArray_1 = transformedArray; _i < transformedArray_1.length; _i++) {
        var obj = transformedArray_1[_i];
        var str = JSON.stringify(obj);
        // If size exceeds 8KB, write the current data to file and reset the data and size variables
        if (size + str.length > 8 * 1024) {
            data += "]";
            writeFileWithUniqueName(fileName, data);
            data = "[";
            size = 1;
        }
        if (size > 1)
            data += ",";
        data += str;
        size += str.length;
    }
    // Write the remaining data to file
    data += "]";
    writeFileWithUniqueName(fileName, data);
}
exports.writeToFile = writeToFile;
// Get Gzipped file names in a folder
function getGzippedFiles(folderPath) {
    return fs_1.default.readdirSync(folderPath).filter(function (file) { return file.endsWith('.gz'); });
}
exports.getGzippedFiles = getGzippedFiles;
function removeExtensionFromFileName(fileName) {
    return fileName.substring(0, fileName.lastIndexOf('.'));
}
exports.removeExtensionFromFileName = removeExtensionFromFileName;
function writeFileWithUniqueName(fileName, content) {
    var uniqueFileName = fileName;
    var index = 1;
    while (fs_1.default.existsSync(uniqueFileName)) {
        uniqueFileName = fileName.substring(0, fileName.lastIndexOf('.')) + "(".concat(index, ")") + fileName.substring(fileName.lastIndexOf('.'));
        index++;
    }
    fs_1.default.writeFileSync(uniqueFileName, content, "utf8");
}
exports.writeFileWithUniqueName = writeFileWithUniqueName;
