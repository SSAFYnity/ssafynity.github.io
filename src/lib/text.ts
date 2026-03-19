export function normalizeNewlines(text: string) {
  return text.replace(/\r\n?/g, '\n')
}

export function collapseNewlines(text: string) {
  return normalizeNewlines(text).replace(/\s*\n\s*/g, ' ').trim()
}