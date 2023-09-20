export class RegexPart {
  private readonly _source: string;

  static of(source: string): RegexPart {
    return new RegexPart(source);
  }

  private constructor(part: string) {
    this._source = part;
  }

  get source(): string {
    return this._source;
  }

  toRegExp(flags?: string): RegExp {
    return new RegExp(this._source, flags);
  }
}
