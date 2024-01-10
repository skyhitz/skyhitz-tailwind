export function isSome<T>(maybe: T | null | undefined): maybe is T {
  return maybe !== null && maybe !== undefined
}

export function formattedDate(publishedAtTimestamp) {
  const formatedDate = new Date(publishedAtTimestamp).toLocaleDateString(
    'en-us',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  )
  return formatedDate
}
