export const indexInto = <T extends Record<string, any>>(
  obj: T,
  path: string,
) => {
  let result = obj

  for (const key of path.split('.')) {
    result = result[key]
  }

  return result
}
