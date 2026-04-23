'use client'

import {useEffect, useMemo, useState} from 'react'
import {NextStudio} from 'next-sanity/studio'
import config from '../../../../../../sanity.config'

type Props = {
  locale: string
  tool?: string[]
}

export function Studio({locale, tool}: Props) {
  const studioConfig = useMemo(
    () => ({
      ...config,
      basePath: `/${locale}${config.basePath}`,
    }),
    [locale]
  )
  const [isReady, setIsReady] = useState(() => tool == null)

  useEffect(() => {
    const workspaceName = studioConfig.name
    const toolPath = tool?.length ? `/${tool.join('/')}` : ''
    const desiredHash = `#/${workspaceName}${toolPath}`
    const desiredUrl = `${studioConfig.basePath}${desiredHash}`

    if (window.location.pathname !== studioConfig.basePath || window.location.hash !== desiredHash) {
      window.history.replaceState(window.history.state, '', desiredUrl)
    }

    setIsReady(true)
  }, [studioConfig.basePath, studioConfig.name, tool])

  if (!isReady) {
    return null
  }

  return <NextStudio config={studioConfig} history="hash" />
}
