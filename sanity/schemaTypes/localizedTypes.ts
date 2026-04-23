import {defineField} from 'sanity'
import {TranslationInput} from '../components/TranslationInput'

export const supportedLanguages = [
  {id: 'en', title: 'English', isDefault: true},
  {id: 'de', title: 'German'},
  {id: 'es', title: 'Spanish'},
  {id: 'fr', title: 'French'},
]

export const localizedString = {
  title: 'Localized String',
  name: 'localizedString',
  type: 'object',
  components: {
    input: TranslationInput,
  },
  fields: supportedLanguages.map((lang) =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: 'string',
    }),
  ),
}

export const localizedBlockContent = {
  title: 'Localized Block Content',
  name: 'localizedBlockContent',
  type: 'object',
  components: {
    input: TranslationInput,
  },
  fields: supportedLanguages.map((lang) =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: 'blockContent',
    }),
  ),
}

export const localizedText = {
  title: 'Localized Text',
  name: 'localizedText',
  type: 'object',
  components: {
    input: TranslationInput,
  },
  fields: supportedLanguages.map((lang) =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: 'text',
    }),
  ),
}
