import {expect, test} from '@playwright/test'
import {getPortableTextPlainText} from '@/components/blog/BlogPortableText'
import {getLocalizedValue} from '@/sanity/lib/blog'
import {getSanityImageUrl} from '@/sanity/lib/image'

const asset = {
  _type: 'reference',
  _ref: 'image-e11dce337da8bba871bff9ecf59cbdd55019c4ca-1500x1041-jpg',
}

test('incomplete or malformed image sources cannot crash rendering', () => {
  for (const source of [undefined, null, {}, {_type: 'image', alt: 'No upload'}, {asset: {}}, {asset: {_ref: 'invalid'}}]) {
    expect(getSanityImageUrl(source, 1200, 630)).toBeNull()
  }

  expect(getSanityImageUrl({asset}, 1200, 630)).toContain('w=1200&h=630')
})

test('translation fallback skips Sanity metadata and empty values', () => {
  expect(getLocalizedValue({_type: 'localizedString', de: 'Deutsch'}, 'fr')).toBe('Deutsch')
  expect(getLocalizedValue({_type: 'localizedString'}, 'fr', 'Fallback')).toBe('Fallback')
  expect(getLocalizedValue({de: '', en: 'English'}, 'de')).toBe('English')
  expect(getLocalizedValue({de: null, fr: 'Français'}, 'de')).toBe('Français')
})

test('table of contents tolerates missing text spans', () => {
  const block = {
    _type: 'block',
    _key: 'paragraph',
    style: 'normal',
    children: [{_type: 'span', _key: 'text', text: 'Article content', marks: []}],
    markDefs: [],
  }
  expect(getPortableTextPlainText({...block, children: [null, ...block.children]})).toBe('Article content')
})
