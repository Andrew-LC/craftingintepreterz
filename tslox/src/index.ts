import { readFileSync } from "fs";
import { resolve } from "path";
import { Scanner } from "./scanner";
import * as readline from "readline";

// Read from commandline
const args: string[] = process.argv;

function runFile(path: string) {
  const buffer: Buffer = readFileSync(resolve(process.cwd(), path));
  const bytes: number[] = [...buffer];
  const scannerToken = new Scanner(Buffer.from(bytes).toString());
  scannerToken.scanTokens()
  console.log(scannerToken.allTokens())
  //eval(Buffer.from(bytes).toString())
}

async function runPrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  for (; ;) {
    rl.prompt();
    const line = await new Promise<string>((resolve) => {
      rl.once('line', resolve);
    });
    if (line === null) break;
    run(line);
  }
}

function run(line: string) {
  eval(line);
}


if (args.slice(2, args.length).length > 1) {
  console.log("Usage: tslox [script]");
  process.exit(64);
} else if (args.slice(2, args.length).length === 1) {
  runFile(args[2])
} else {
  runPrompt();
}
