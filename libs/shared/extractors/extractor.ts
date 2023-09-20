export type Extractor<T> = (text: string) => Promise<T | null>;
