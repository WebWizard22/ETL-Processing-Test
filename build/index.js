"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var zlib_1 = __importDefault(require("zlib"));
var utils_1 = require("./utils");
// Read the incoming gzipped JSON file
var fileNames = (0, utils_1.getGzippedFiles)("input");
fileNames.forEach(function (fileName) {
    fs_1.default.readFile("input/" + fileName, function (err, data) {
        if (err)
            throw err;
        zlib_1.default.gunzip(data, function (err, result) {
            if (err)
                throw err;
            var inputJSON = JSON.parse(result.toString());
            var transformedArray = (0, utils_1.transformJSON)(inputJSON);
            (0, utils_1.writeToFile)("output/" + (0, utils_1.removeExtensionFromFileName)(fileName), transformedArray);
        });
    });
});
