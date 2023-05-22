import { Token } from "./Token"
import { TokenType } from "./tokens"
import { error } from './error'

export class Scanner {
  private source: string;
  private tokens: Token[];
  private start: number;
  private current: number;
  private line: number;

  constructor(source: string) {
    this.source = source;
    this.tokens = [];
    this.start = 0;
    this.current = 0;
    this.line = 1;
  }

  scanTokens(): Token[] {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }

    this.tokens.push(new Token(TokenType.EOF, "", {}, this.line));
    return this.tokens;
  }

  private isAtEnd(): boolean {
    return this.current >= this.source.length;
  }

  private scanToken(): void {
    const c = this.advance();
    switch (c) {
      case '(':
        this.addToken(TokenType.LEFT_PAREN)
        break;
      case ')':
        this.addToken(TokenType.RIGHT_PAREN)
        break;
      case '{':
        this.addToken(TokenType.LEFT_BRACE)
        break;
      case '}':
        this.addToken(TokenType.RIGHT_BRACE)
        break;
      case ',':
        this.addToken(TokenType.COMMA)
        break;
      case '.':
        this.addToken(TokenType.DOT)
        break;
      case '-':
        this.addToken(TokenType.MINUS)
        break;
      case '+':
        this.addToken(TokenType.PLUS)
        break;
      case ';':
        this.addToken(TokenType.SEMICOLON)
        break;
      case '*':
        break;
      case '!':
        this.addToken(this.match("=") ? TokenType.BANG_EQUAL : TokenType.BANG)
        break;
      case '=':
        this.addToken(this.match("=") ? TokenType.BANG_EQUAL : TokenType.BANG)
        break;
      case '<':
        this.addToken(this.match("=") ? TokenType.BANG_EQUAL : TokenType.BANG)
        break;
      case '>':
        this.addToken(this.match("=") ? TokenType.BANG_EQUAL : TokenType.BANG)
        break;
      case '/':
        if (this.match('/')) {
          while (this.peek() !== '\n' && !this.isAtEnd()) this.advance();
        } else {
          this.addToken(TokenType.SLASH);
        }
        break;
      case ' ':
      case '\r':
      case '\t':
        // Ignore whitespace.
        break;
      case '\n':
        this.line++;
        break;
      case '"': this.string(); break;
      default:
        if (this.isDigit(c)) {
          this.number()
        } else if (this.isAlpha(c)) {
          this.identifier();
        } else {
          error(this.line, "Unexpected character.")
        }
        break;
    }
  }

  private identifier(): void {
    while (this.isAlphaNumeric(this.peek())) this.advance();
    this.addToken(TokenType.IDENTIFIER)
  }

  private isAlpha(c: string): boolean {
    return (c >= 'a' && c <= 'z') ||
      (c >= 'A' && c <= 'Z') ||
      c == '_';
  }

  private isAlphaNumeric(c: string): boolean {
    return this.isAlpha(c) || this.isDigit(c);
  }

  private number() {
    while (this.isDigit(this.peek())) this.advance();
    // Look for a fractional part.
    if (this.peek() == '.' && this.isDigit(this.peekNext())) {
      // Consume the "."
      this.advance();
      while (this.isDigit(this.peek())) this.advance();
    }
    this.addToken(TokenType.NUMBER,
      parseInt(`${this.source.substring(this.start, this.current)}`));
  }
  private isDigit(c: string) {
    return c >= '0' && c <= '9';
  }

  private string() {
    while (this.peek() !== '"' && !this.isAtEnd()) {
      if (this.peek() == '\n') this.line++;
      this.advance();
    }

    if (this.isAtEnd()) {
      error(this.line, "Unterminated string.");
      return;
    }

    this.advance();

    const value: string = this.source.substring(this.start + 1, this.current - 1);
    this.addToken(TokenType.STRING, value, {});
  }

  private match(expected: string) {
    if (this.isAtEnd()) return false;
    if (this.source.charAt(this.current) != expected) return false;

    this.current++;
    return true;
  }

  private peek(): string {
    if (this.isAtEnd()) return '\0';
    return this.source.charAt(this.current)
  }

  private peekNext() {
    if (this.current + 1 >= this.source.length) return '\0';
    return this.source.charAt(this.current + 1);
  }

  private advance(): string {
    return this.source.charAt(this.current++);
  }

  private addToken(type: TokenType, text?: string, literal?: object): void {
    if (!literal) {
      this.addToken(type, {});
    }
    //const text: string = this.source.substring(this.start, this.current);
    this.tokens.push(new Token(type, text, literal, this.line));
  }
}
