/**
 * Next.js only rewrites basePath into <Image>/<Link>/router calls — raw
 * `src`/`poster` strings on plain <img>/<video> tags need it applied by
 * hand, or they 404 once the site is served from a GitHub Pages project
 * path (https://<user>.github.io/<repo>/...).
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
