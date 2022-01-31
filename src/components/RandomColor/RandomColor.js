const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']

export function getRandomColor (result = '#') {
  if (result.length == 7) return result
  return getRandomColor(result + values[Math.floor(Math.random() * values.length)])
}
