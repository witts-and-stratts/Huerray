import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {blogType} from './blogType'
import {authorType} from './authorType'
import {faqType} from './faqType'
import {helpCenterType} from './helpCenterType'
import {helpTopicType} from './helpTopicType'
import {localizedString, localizedBlockContent, localizedText} from './localizedTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    blogType,
    authorType,
    faqType,
    helpCenterType,
    helpTopicType,
    localizedString,
    localizedBlockContent,
    localizedText,
  ],
}
