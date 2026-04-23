import {revalidateTag} from 'next/cache'
import {type NextRequest, NextResponse} from 'next/server'
import {parseBody} from 'next-sanity/webhook'

type Audience = 'admin' | 'creator' | 'brand'

type WebhookPayload = {
  _id?: string
  _type?: string
  audience?: Audience
}

const ALL_AUDIENCES: Audience[] = ['admin', 'creator', 'brand']

export async function POST(req: NextRequest) {
  try {
    const {body, isValidSignature} = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true
    )

    if (!isValidSignature) {
      return new Response('Invalid signature', {status: 401})
    }

    if (!body?._type) {
      return new Response('Bad request', {status: 400})
    }

    const tags = getTagsForPayload(body as WebhookPayloadWithType)

    for (const tag of tags) {
      revalidateTag(tag, 'max')
    }

    return NextResponse.json({
      ok: true,
      revalidated: tags,
      documentId: body._id ?? null,
      type: body._type,
    })
  } catch (error) {
    console.error('Sanity revalidation webhook failed', error)
    return new Response('Internal Server Error', {status: 500})
  }
}

type WebhookPayloadWithType = WebhookPayload & {
  _type: string
}

function getTagsForPayload(body: WebhookPayloadWithType): string[] {
  switch (body._type) {
    case 'faq':
      return ['faq', `faq:${body.audience ?? 'admin'}`]
    case 'helpCenter':
      return ['helpCenter', `helpCenter:${body.audience ?? 'admin'}`]
    case 'category':
      return ['category', 'faq', ...ALL_AUDIENCES.map((audience) => `faq:${audience}`)]
    default:
      return [body._type]
  }
}
