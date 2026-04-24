import {HelpCircleIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

const audienceOptions = [
  {title: 'Admin', value: 'admin'},
  {title: 'Creator', value: 'creator'},
  {title: 'Brand', value: 'brand'},
]

const topicOptions = [
  {title: 'Admin: User Management', value: 'admin-users'},
  {title: 'Admin: Support Cases', value: 'admin-cases'},
  {title: 'Admin: Platform Settings', value: 'admin-platform'},
  {title: 'Brand: Getting Started', value: 'brand-start'},
  {title: 'Brand: Managing Creators', value: 'brand-creators'},
  {title: 'Brand: Billing & Payments', value: 'brand-billing'},
  {title: 'Creator: Getting Started', value: 'creator-start'},
  {title: 'Creator: Submitting Content', value: 'creator-submit'},
  {title: 'Creator: Earnings & Payouts', value: 'creator-earnings'},
]

export const helpTopicType = defineType({
  name: 'helpTopic',
  title: 'Help Topic',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'audience',
      title: 'Audience',
      type: 'string',
      options: {
        list: audienceOptions,
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'topicId',
      title: 'Topic ID',
      type: 'string',
      options: {
        list: topicOptions,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls the topic order and home-card order for this audience.',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'icon',
      title: 'Home Card Icon Name',
      type: 'string',
      description: 'Name of the Hugeicon to use on the help home card.',
    }),
    defineField({
      name: 'actionItems',
      title: 'How to Use This Area',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'localizedString',
            }),
          ],
          preview: {
            select: {
              title: 'text.en',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'localizedString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label.en',
              subtitle: 'href',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'relatedFaqs',
      title: 'Related FAQs',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'faq'}]})],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      audience: 'audience',
      order: 'order',
    },
    prepare({title, audience, order}) {
      const audienceLabel = audience ? audience.charAt(0).toUpperCase() + audience.slice(1) : 'No audience'

      return {
        title,
        subtitle: `${audienceLabel}${typeof order === 'number' ? ` | Order: ${order}` : ''}`,
      }
    },
  },
})
