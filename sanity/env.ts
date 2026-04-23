export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-23'

export const dataset = assertValue(
  normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_DATASET),
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

function normalizeEnvValue(value: string | undefined) {
  if (typeof value !== 'string') {
    return value
  }

  const trimmed = value.trim()

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}
