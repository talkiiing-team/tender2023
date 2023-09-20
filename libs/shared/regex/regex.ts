import { exists } from "../guards";
import { RegexPart } from "./regex-part";

export const raw = (str: string): RegexPart => RegexPart.of(str);

export const escape = (str: string): RegexPart =>
  raw(str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"));

export const nonCapturingGroup = (part: RegexPart): RegexPart =>
  raw(`(?:${part.source})`);

export const capturingGroup = (part: RegexPart): RegexPart =>
  raw(`(${part.source})`);

export const oneOrMore = (part: RegexPart): RegexPart =>
  raw(`${nonCapturingGroup(part).source}+`);

export const zeroOrMore = (part: RegexPart): RegexPart =>
  raw(`${nonCapturingGroup(part).source}*`);

export const anyOf = (...parts: RegexPart[]): RegexPart =>
  nonCapturingGroup(raw(`${parts.map((part) => part.source).join("|")}`));

export const sequence = (...parts: RegexPart[]): RegexPart =>
  raw(parts.map((part) => part.source).join(""));

export const optional = (part: RegexPart): RegexPart =>
  raw(`${nonCapturingGroup(part).source}?`);

export const times = (part: RegexPart, min: number, max?: number): RegexPart =>
  raw(`${nonCapturingGroup(part).source}{${min},${exists(max) ? max : ""}}`);

export const ANYTHING = raw(".");

export const NOTHING = raw("");

export const WORD_BOUNDARY = raw("\\b");

export const DIGIT = raw("\\d");

export const NON_DIGIT = raw("\\D");

export const WHITESPACE = raw("\\s");

export const NON_WHITESPACE = raw("\\S");

export const WORD = raw("\\w");

export const NON_WORD = raw("\\W");

export const TAB = raw("\\t");

export const NEWLINE = raw("\\n");
