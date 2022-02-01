export function getHours (seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = (seconds % 3600) / 60
  return `${hours}${minutes === 0 ? '' : ':' + minutes}`
}
