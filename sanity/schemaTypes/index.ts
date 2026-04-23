import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {faqType} from './faqType'
import {helpCenterType} from './helpCenterType'
import {localizedString, localizedBlockContent, localizedText} from './localizedTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    faqType,
    helpCenterType,
    localizedString,
    localizedBlockContent,
    localizedText,
  ],
}
