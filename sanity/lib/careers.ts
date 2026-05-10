import {defineQuery} from 'next-sanity'
import {sanityFetch} from './live'

export const OPEN_POSITIONS_QUERY = defineQuery(/* groq */ `
  *[_type == "openPosition"] | order(orderRank asc, _createdAt asc) {
    _id,
    title,
    department,
    location,
    applyUrl,
    body
  }
`)

export type LocalizedString = Record<string, string | undefined>
export type LocalizedBlockContent = Record<string, unknown[] | undefined>

export type OpenPosition = {
  _id: string
  title?: LocalizedString
  department?: LocalizedString
  location?: LocalizedString
  applyUrl?: string
  body?: LocalizedBlockContent
}

export async function getOpenPositions() {
  const {data} = await sanityFetch({
    query: OPEN_POSITIONS_QUERY,
    tags: ['openPosition'],
  })

  return (data ?? []) as OpenPosition[]
}
