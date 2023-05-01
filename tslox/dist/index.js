"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
// Read from commandline
const args = process.argv;
function runFile(path) {
    const buffer = (0, fs_1.readFileSync)((0, path_1.resolve)(process.cwd(), path));
    const bytes = [...buffer];
    console.log(Buffer.from(bytes).toString());
}
function runPromt(file) {
    console.log("promt");
}
if (args.slice(2, args.length).length > 1) {
    console.log("Usage: tslox [script]");
    process.exit(64);
}
else if (args.slice(2, args.length).length === 1) {
    runFile(args[2]);
}
else {
    runPromt();
}
