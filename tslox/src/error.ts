function report(line: number, where: string, message: string): void {
  console.log(`[Line ${line}] Error ${where} ${message}`);
}

export function error(line: number, message: string): void {
  report(line, "", message);
}
