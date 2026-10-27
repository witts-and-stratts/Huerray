import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

export function getSanityImageUrl(source: unknown, width: number, height: number): string | null {
  if (!source) return null

  try {
    return urlFor(source as SanityImageSource).width(width).height(height).fit('crop').url()
  } catch {
    return null
  }
}
