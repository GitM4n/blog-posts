export function formatDate(date: number | string | Date) {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })
}
