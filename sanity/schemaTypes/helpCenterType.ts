import {InfoFilledIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const helpCenterType = defineType({
  name: 'helpCenter',
  title: 'Help Center Settings',
  type: 'document',
  icon: InfoFilledIcon,
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
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'localizedString',
    }),
    defineField({
      name: 'cards',
      title: 'Support Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localizedString',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'localizedString',
            }),
            defineField({
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Name of the Hugeicon to use (e.g., UserMultiple02Icon)',
            }),
          ],
          preview: {
            select: {
              title: 'title.en',
              subtitle: 'description.en',
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: {
      audience: 'audience',
    },
    prepare({audience}) {
      return {
        title: `Help Center: ${audience?.charAt(0).toUpperCase() + audience?.slice(1)}`,
      }
    },
  },
})
