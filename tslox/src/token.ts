export class Token {
  TokenType: string
  lexeme: string
  literal: object
  line: number

  constructor(TokenType: string, lexeme: string, literal: object, line: number) {
    this.TokenType = TokenType;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }

  toString(): string {
    return TokenType + " " + lexeme + " " + literal;
  }
}
