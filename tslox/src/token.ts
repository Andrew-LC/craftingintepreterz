import { TokenType } from "./tokens";

/*
  Token {
    type,
    lexeme,
    literal,
    line
  }
*/

export class Token {
  type: TokenType
  lexeme: string
  literal: object | null
  line: number

  constructor(type: TokenType, lexeme: string, literal: object, line: number) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }

  toString(): string {
    return this.type + " " + this.lexeme + " " + this.literal;
  }
}
