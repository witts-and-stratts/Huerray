import { config } from "../config";

const CDN_BASE_URL =
  process.env.NEXT_PUBLIC_CDN_BASE_URL ?? 'https://cdn.huerray.de';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export type ResizingType =
  | 'fit'
  | 'fill'
  | 'fill-down'
  | 'force'
  | 'auto';

export type Gravity =
  | 'no'   // north
  | 'so'   // south
  | 'ea'   // east
  | 'we'   // west
  | 'noea' // north-east
  | 'nowe' // north-west
  | 'soea' // south-east
  | 'sowe' // south-west
  | 'ce'   // center
  | 'sm'   // smart (content-aware)
  | 'fp';  // focus point

export type OutputFormat = 'webp' | 'avif' | 'jpg' | 'png' | 'gif';

export interface ImgproxyOptions {
  /** Width in pixels. `0` = auto (preserve aspect ratio). @default 0 */
  width?: number;
  /** Height in pixels. `0` = auto (preserve aspect ratio). @default 0 */
  height?: number;
  /** How the image should be resized to fit the given dimensions. @default 'fill' */
  resizingType?: ResizingType;
  /** JPEG / WebP quality 1-100. @default 80 */
  quality?: number;
  /** Sharpening sigma. `0` = no sharpening. @default 0 */
  sharpen?: number;
  /** Gravity (crop anchor). @default undefined (imgproxy default) */
  gravity?: Gravity;
  /** DPR multiplier (1-6). @default undefined */
  dpr?: number;
  /** Blur sigma. @default undefined */
  blur?: number;
  /** Output format. @default 'webp' */
  format?: OutputFormat;
}

/* ------------------------------------------------------------------ */
/*  Defaults                                                          */
/* ------------------------------------------------------------------ */

const DEFAULTS: Required<
  Pick<ImgproxyOptions, 'width' | 'height' | 'resizingType' | 'quality' | 'sharpen' | 'format'>
> = {
  width: 0,
  height: 0,
  resizingType: 'fill',
  quality: 80,
  sharpen: 0,
  format: 'webp',
};

/* ------------------------------------------------------------------ */
/*  Builder                                                           */
/* ------------------------------------------------------------------ */

/**
 * Build an imgproxy URL for the given source image.
 *
 * @example
 * ```ts
 * // Minimal — resize to 400 px wide, auto height, webp
 * imgproxyUrl('/api/v1/uploads/preview/images/abc.jpg', { width: 400 })
 *
 * // Full control
 * imgproxyUrl('https://backend.huerray.de/api/v1/uploads/preview/images/abc.jpg', {
 *   width: 1080,
 *   quality: 100,
 *   sharpen: 0.5,
 * })
 * ```
 *
 * @param src     The source image URL. Can be a full URL or a path
 *                relative to the API base URL (e.g. `/api/v1/uploads/…`).
 * @param opts    Processing options (all optional, sensible defaults apply).
 * @returns       The fully-qualified imgproxy CDN URL.
 */
export function imgproxyUrl(src: string, opts: ImgproxyOptions = {}): string {
  const {
    width = DEFAULTS.width,
    height = DEFAULTS.height,
    resizingType = DEFAULTS.resizingType,
    quality = DEFAULTS.quality,
    sharpen = DEFAULTS.sharpen,
    format = DEFAULTS.format,
    gravity,
    dpr,
    blur,
  } = opts;

  // If the source is a relative path, prepend the API base URL.
  const sourceUrl = src?.startsWith('http')
    ? src
    : `${config.api.baseUrl}${src?.startsWith('/') ? '' : '/'}${src}`;

  // Build the processing-options path segments.
  const parts: string[] = [
    `size:${width}:${height}`,
    `resizing_type:${resizingType}`,
    `quality:${quality}`,
  ];

  if (sharpen) parts.push(`sharpen:${sharpen}`);
  if (gravity) parts.push(`gravity:${gravity}`);
  if (dpr && dpr > 1) parts.push(`dpr:${dpr}`);
  if (blur) parts.push(`blur:${blur}`);

  const processing = parts.join('/');

  return `${CDN_BASE_URL}/insecure/${processing}/plain/${sourceUrl}@${format}`;
}

/* ------------------------------------------------------------------ */
/*  Presets                                                           */
/* ------------------------------------------------------------------ */

/** Commonly-used size presets. */
export const imgpresets = {
  /** Thumbnail — 120×120, fill, webp */
  thumbnail: (src: string, overrides?: Partial<ImgproxyOptions>) =>
    imgproxyUrl(src, { width: 120, height: 120, ...overrides }),

  /** Avatar — 200×200, fill, webp */
  avatar: (src: string, overrides?: Partial<ImgproxyOptions>) =>
    imgproxyUrl(src, { width: 200, height: 200, ...overrides }),

  /** Card — 400 wide, auto height */
  card: (src: string, overrides?: Partial<ImgproxyOptions>) =>
    imgproxyUrl(src, { width: 400, ...overrides }),

  /** Banner — 1080 wide, high quality */
  banner: (src: string, overrides?: Partial<ImgproxyOptions>) =>
    imgproxyUrl( src, { width: 1080, quality: 80, sharpen: 0.5, ...overrides } ),
  
  /** Large — 1600 wide, high quality */
  large: (src: string, overrides?: Partial<ImgproxyOptions>) =>
    imgproxyUrl( src, { width: 1600, quality: 80, sharpen: 0.5, ...overrides } ),

  /** Full-size — original dimensions, webp conversion only */
  full: (src: string, overrides?: Partial<ImgproxyOptions>) =>
    imgproxyUrl(src, { ...overrides }),
} as const;
