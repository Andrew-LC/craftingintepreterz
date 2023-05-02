import { Token } from "./Token"
import { TokenTypes } from "./tokens"

class Scanner {
  private source: string;
  private tokens: Token[];
  private start: number = 0;
  private current: number = 0;
  private line: number = 1;

  constructor(source: string) {
    this.source = source;
  }
  scanTokens(): Token[] {
    while (!isAtEnd()) {
      start = current;
      scanToken();
    }

    tokens.push(new Token(EOF, "", null, line));
    return tokens;
  }
  private isAtEnd(): boolean {
    return current >= source.length;
  }
  private scanToken(): void {
    const c = advance();
    switch (c) {
      case '(':
        addToken(TokenType.Left_PAREN)
        break;
      case ')':
        addToken(TokenType.RIGHT_PAREN)
        break;
      case '{':
        addToken(TokenType.Left_BRACE)
        break;
      case '}':
        addToken(TokenType.RIGHT_BRACE)
        break;
      case ',':
        addToken(TokenType.COMMA)
        break;
      case '.':
        addToken(TokenType.DOT)
        break;
      case '-':
        addToken(TokenType.MINUS)
        break;
      case '+':
        addToken(TokenType.PLUS)
        break;
      case ';':
        addToken(TokenType.SEMICOLON)
        break;
      case '*':
        addToken(TokenType.STAR)
        break;
      default:
        console.log("Error")
    }
  }
  private advance(): string {
    return source.charAt(current++);
  }
  private addToken(type: TokenType): void {
    addToken(type, null);
  }
  private addToken(type: TokenType, literal: object) {
    const text: string = source.substring(start, current);
    tokens.add(new Token(type, text, literal, line));
  }
}
