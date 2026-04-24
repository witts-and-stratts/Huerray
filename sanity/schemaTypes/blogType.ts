import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'settings', title: 'Settings'},
    {name: 'seo', title: 'SEO'},
  ],
  fieldsets: [
    {name: 'content', title: 'Content'},
    {name: 'editorial', title: 'Editorial', options: {collapsible: true, collapsed: false, columns: 2}},
    {name: 'media', title: 'Media', options: {collapsible: true, collapsed: true}},
    {name: 'taxonomy', title: 'Taxonomy', options: {collapsible: true, collapsed: true}},
    {name: 'seo', title: 'SEO & Sharing', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      group: 'content',
      fieldset: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      fieldset: 'content',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Short summary used in blog listings, previews, and metadata fallbacks.',
      type: 'localizedText',
      group: 'content',
      fieldset: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Primary author',
      type: 'reference',
      to: [{type: 'author'}],
      group: 'settings',
      fieldset: 'editorial',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coAuthors',
      title: 'Co-authors',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'author'}]})],
      group: 'settings',
      fieldset: 'editorial',
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'settings',
      fieldset: 'editorial',
      initialValue: 'draft',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'In review', value: 'inReview'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured post',
      type: 'boolean',
      group: 'settings',
      fieldset: 'editorial',
      initialValue: false,
    }),
    defineField({
      name: 'readingTimeMinutes',
      title: 'Estimated reading time',
      description: 'Manual reading time override in minutes.',
      type: 'number',
      group: 'settings',
      fieldset: 'editorial',
      validation: (rule) => rule.integer().min(1).max(60),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      group: 'settings',
      fieldset: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'localizedString',
          title: 'Alternative text',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'localizedText',
        }),
        defineField({
          name: 'credit',
          title: 'Credit',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'category'}]})],
      group: 'settings',
      fieldset: 'taxonomy',
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Freeform keywords for filtering and internal discovery.',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      group: 'settings',
      fieldset: 'taxonomy',
      options: {
        layout: 'tags',
      },
      validation: (rule) => rule.unique().max(12),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'settings',
      fieldset: 'editorial',
      validation: (rule) =>
        rule.custom((publishedAt, context) => {
          if (context.document?.status === 'published' && !publishedAt) {
            return 'Published posts need a published date'
          }

          return true
        }),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
      group: 'settings',
      fieldset: 'editorial',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'localizedBlockContent',
      group: 'content',
      fieldset: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related posts',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'blog'}]})],
      group: 'settings',
      fieldset: 'taxonomy',
      validation: (rule) => rule.unique().max(4),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      description: 'Optional title override for search results and social sharing.',
      type: 'localizedString',
      group: 'seo',
      fieldset: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      description: 'Optional description override. If empty, use the excerpt.',
      type: 'localizedText',
      group: 'seo',
      fieldset: 'seo',
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Social sharing image',
      description: 'Optional 1200x630 image for link previews. Falls back to the main image.',
      type: 'image',
      group: 'seo',
      fieldset: 'seo',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'localizedString',
        }),
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'seo',
      fieldset: 'seo',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      group: 'seo',
      fieldset: 'seo',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      author: 'author.name',
      status: 'status',
      publishedAt: 'publishedAt',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author, publishedAt, status} = selection
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Unscheduled'
      const subtitle = [author && `by ${author}`, status, date].filter(Boolean).join(' | ')

      return {...selection, subtitle}
    },
  },
})
