/**
 * Writing — posts, rendered as entries in the same log.
 *
 * Nothing is seeded here. A portfolio must not carry invented posts, so the
 * array starts empty and the section renders an honest empty state until the
 * first real entry lands.
 *
 * To publish, add an object to `posts`, newest first. That is the whole
 * workflow — no build step, no CMS.
 *
 *   {
 *     slug: 'why-geez-search-is-hard',
 *     title: 'Why Ge’ez search is hard',
 *     date: '2026-10-04',
 *     dateLabel: 'October 2026',
 *     summary: 'One sound, several spellings — and what that means for a search index.',
 *     tags: ['Amharic', 'Search', 'Kotlin'],
 *     href: 'https://…',   // external host, or an in-repo route later
 *   }
 *
 * `href` is deliberately open: point it at wherever you publish. If posts
 * eventually live in this repo as markdown, that needs a build step (Vite's
 * import.meta.glob plus a markdown parser) — worth doing once there are
 * enough posts to justify it, not before.
 */

export interface Post {
  slug: string
  title: string
  /** ISO date — sorting and <time datetime>. */
  date: string
  /** Human label shown on the entry. */
  dateLabel: string
  summary: string
  tags: string[]
  href: string
  /** Set when the post lives on another host, so the link gets the ↗ treatment. */
  external?: boolean
}

export const posts: Post[] = []

export const writingMeta = {
  /** Shown beside the section heading. */
  standfirst: 'Notes on backends, Ge’ez text handling, and instrumenting a city',
  /**
   * Rendered when `posts` is empty. Says the true thing plainly rather than
   * pretending there is a backlog.
   */
  emptyTitle: 'Nothing published yet',
  emptyBody:
    'This section fills in as posts are written. Until then, the code is the writing — the repositories above are public and reasonably commented.',
  emptyCta: { label: 'GitHub', href: 'https://github.com/natinael96' },
} as const
