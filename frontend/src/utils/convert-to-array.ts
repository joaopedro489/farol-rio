export const convertToArray = <T>(value: T | T[]): T[] => {
  if (value == undefined || value === null || value === '') return []

  if (Array.isArray(value)) {
    return value
  }

  return [value]
}
