import {DocumentTextIcon} from '@sanity/icons'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

export const openPositionType = defineType({
  name: 'openPosition',
  title: 'Open Position',
  type: 'document',
  icon: DocumentTextIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'openPosition'}),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'applyUrl',
      title: 'Apply URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'body',
      title: 'Description',
      type: 'localizedBlockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      department: 'department.en',
    },
    prepare({title, department}) {
      return {
        title: title || 'Open Positions',
        subtitle: department || 'Open Position',
      }
    },
  },
})
