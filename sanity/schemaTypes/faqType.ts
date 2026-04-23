import {HelpCircleIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'audience',
      title: 'Audience',
      type: 'string',
      options: {
        list: [
          {title: 'Admin', value: 'admin'},
          {title: 'Creator', value: 'creator'},
          {title: 'Brand', value: 'brand'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'localizedString',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'question.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'localizedBlockContent',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to sort FAQs (lower numbers appear first)',
    }),
  ],
  preview: {
    select: {
      title: 'question.en',
      audience: 'audience',
      category: 'category.title',
    },
    prepare(selection) {
      const {audience, category} = selection
      const audienceLabel = audience ? audience.charAt(0).toUpperCase() + audience.slice(1) : 'No Audience'
      return {
        ...selection,
        subtitle: `${audienceLabel}${category ? ` | Category: ${category}` : ''}`,
      }
    },
  },
})
