export type Extractor<T> = (text: string) => Promise<T | null>;

export async function tryExtractAll<State extends { [key: string]: any }>(
  text: string,
  extractors: {
    [K in keyof State]: Extractor<State[K]>;
  }
): Promise<{
  [K in keyof State]: State[K] | null;
}> {
  const results = {} as {
    [K in keyof State]: State[K] | null;
  };

  const promises = Object.entries(extractors).map(async ([name, extractor]) => {
    results[name as keyof State] = await extractor(text);
  });

  await Promise.all(promises);

  return results;
}

export async function extractIfNull<T>(
  value: T | null,
  extractor: Extractor<T>,
  textCallback: () => Promise<string>
): Promise<T | null> {
  if (!value) {
    const text = await textCallback();
    return await extractor(text);
  }

  return value;
}
