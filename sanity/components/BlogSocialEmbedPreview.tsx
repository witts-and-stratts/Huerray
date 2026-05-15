import {EarthGlobeIcon} from '@sanity/icons'
import {Box, Card, Flex, Stack, Text} from '@sanity/ui'
import type {PreviewProps} from 'sanity'

const PLATFORM_LABELS: Record<string, string> = {
  x: 'X / Twitter',
  twitter: 'X / Twitter',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  threads: 'Threads',
}

type SocialEmbedPreviewProps = PreviewProps & {
  platform?: string
  url?: string
  caption?: string
}

export function BlogSocialEmbedPreview(props: SocialEmbedPreviewProps) {
  const {platform, url, caption} = props
  const key = (platform || '').toLowerCase()
  const label = PLATFORM_LABELS[key] || 'Social post'
  const hasUrl = Boolean(url)

  return (
    <Card padding={3} radius={2} shadow={1} tone={hasUrl ? 'transparent' : 'caution'}>
      <Stack space={3}>
        <Flex align="center" gap={2}>
          <Box style={{display: 'flex', alignItems: 'center'}}>
            <EarthGlobeIcon />
          </Box>
          <Text weight="semibold" size={1}>
            {label} embed
          </Text>
        </Flex>

        {caption && (
          <Text size={1}>
            {caption}
          </Text>
        )}

        <Text size={1} muted style={{wordBreak: 'break-all'}}>
          {hasUrl ? url : 'No URL set — open this block to add a post URL.'}
        </Text>
      </Stack>
    </Card>
  )
}
