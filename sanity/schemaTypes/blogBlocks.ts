import {
  BlockElementIcon,
  CodeIcon,
  EarthGlobeIcon,
  InfoFilledIcon,
  LinkIcon,
  PlayIcon,
} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {BlogSocialEmbedPreview} from '../components/BlogSocialEmbedPreview'

const codeLanguages = [
  {title: 'TypeScript', value: 'typescript'},
  {title: 'JavaScript', value: 'javascript'},
  {title: 'TSX', value: 'tsx'},
  {title: 'JSX', value: 'jsx'},
  {title: 'JSON', value: 'json'},
  {title: 'Markdown', value: 'markdown'},
  {title: 'Bash', value: 'bash'},
  {title: 'CSS', value: 'css'},
  {title: 'HTML', value: 'html'},
]

const socialPlatforms = [
  {title: 'X / Twitter', value: 'x'},
  {title: 'Instagram', value: 'instagram'},
  {title: 'TikTok', value: 'tiktok'},
  {title: 'YouTube', value: 'youtube'},
  {title: 'LinkedIn', value: 'linkedin'},
  {title: 'Facebook', value: 'facebook'},
  {title: 'Threads', value: 'threads'},
]

const calloutTones = [
  {title: 'Info', value: 'info'},
  {title: 'Success', value: 'success'},
  {title: 'Warning', value: 'warning'},
  {title: 'Danger', value: 'danger'},
]

const linkStyles = [
  {title: 'Primary', value: 'primary'},
  {title: 'Secondary', value: 'secondary'},
  {title: 'Text', value: 'text'},
]

export const blogCodeBlockType = defineType({
  name: 'blogCodeBlock',
  title: 'Code block',
  type: 'object',
  icon: CodeIcon,
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: codeLanguages,
      },
      initialValue: 'typescript',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'filename',
      title: 'Filename',
      type: 'string',
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 10,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      language: 'language',
      filename: 'filename',
    },
    prepare({language, filename}) {
      return {
        title: 'Code block',
        subtitle: [language, filename].filter(Boolean).join(' • '),
      }
    },
  },
})

export const blogVideoEmbedType = defineType({
  name: 'blogVideoEmbed',
  title: 'Video embed',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Video URL',
      description: 'Paste a YouTube, Vimeo, or direct video URL.',
      type: 'url',
      validation: (rule) =>
        rule
          .uri({
            scheme: ['http', 'https'],
          })
          .required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'poster',
      title: 'Poster image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
      media: 'poster',
    },
  },
})

export const blogSocialEmbedType = defineType({
  name: 'blogSocialEmbed',
  title: 'Social post',
  type: 'object',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: socialPlatforms,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Post URL',
      description: 'Paste the public URL for the post or profile.',
      type: 'url',
      validation: (rule) =>
        rule
          .uri({
            scheme: ['http', 'https'],
          })
          .required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
      caption: 'caption',
    },
  },
  components: {
    preview: BlogSocialEmbedPreview,
  },
})

export const blogCalloutType = defineType({
  name: 'blogCallout',
  title: 'Callout',
  type: 'object',
  icon: InfoFilledIcon,
  fields: [
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: calloutTones,
      },
      initialValue: 'info',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      tone: 'tone',
      title: 'title',
      message: 'message',
    },
    prepare({tone, title, message}) {
      return {
        title: title || `${tone || 'info'} callout`,
        subtitle: message,
      }
    },
  },
})

export const blogCtaType = defineType({
  name: 'blogCta',
  title: 'Call to action',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Button label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link URL',
      type: 'url',
      validation: (rule) =>
        rule
          .uri({
            scheme: ['http', 'https'],
          })
          .required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: linkStyles,
      },
      initialValue: 'primary',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      label: 'label',
      href: 'href',
      style: 'style',
    },
    prepare({label, href, style}) {
      return {
        title: label || 'Call to action',
        subtitle: [style, href].filter(Boolean).join(' • '),
      }
    },
  },
})

export const blogSeparatorType = defineType({
  name: 'blogSeparator',
  title: 'Separator',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      initialValue: 'divider',
      hidden: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Separator',
      }
    },
  },
})
