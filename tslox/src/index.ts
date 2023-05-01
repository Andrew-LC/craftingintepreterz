import { readFileSync } from "fs";
import { resolve } from "path";

// Read from commandline
const args: string[] = process.argv;

function runFile(path: string) {
  const buffer: Buffer = readFileSync(resolve(process.cwd(), path));
  const bytes: number[] = [...buffer];
  console.log(Buffer.from(bytes).toString())
}

function runPromt(file: string) {
  console.log("promt");
}


if (args.slice(2, args.length).length > 1) {
  console.log("Usage: tslox [script]");
  process.exit(64);
} else if (args.slice(2, args.length).length === 1) {
  runFile(args[2])
} else {
  runPromt();
}
