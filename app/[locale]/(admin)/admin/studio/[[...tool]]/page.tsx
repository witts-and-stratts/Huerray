/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 */

import {Studio} from './Studio'

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

type Props = {
  params: Promise<{locale: string; tool?: string[]}>
}

export default async function StudioPage({params}: Props) {
  const {locale, tool} = await params

  return <Studio locale={locale} tool={tool} />
}
