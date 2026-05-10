import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {blogCalloutType, blogCodeBlockType, blogCtaType, blogSeparatorType, blogSocialEmbedType, blogVideoEmbedType} from './blogBlocks'
import {categoryType} from './categoryType'
import {blogType} from './blogType'
import {authorType} from './authorType'
import {faqType} from './faqType'
import {helpCenterType} from './helpCenterType'
import {helpTopicType} from './helpTopicType'
import {openPositionType} from './openPositionsType'
import {localizedString, localizedBlockContent, localizedText} from './localizedTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    blogVideoEmbedType,
    blogSocialEmbedType,
    blogCalloutType,
    blogCtaType,
    blogCodeBlockType,
    blogSeparatorType,
    categoryType,
    blogType,
    authorType,
    faqType,
    helpCenterType,
    helpTopicType,
    openPositionType,
    localizedString,
    localizedBlockContent,
    localizedText,
  ],
}
