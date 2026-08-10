/**
 * Scroll reveal — one IntersectionObserver for every `.rv` element on the page.
 * Elements opt in with class="rv" and may stagger via style="--rv-d: 120ms".
 * Reduced motion is handled in CSS (reveals become instant).
 */

let observer: IntersectionObserver | null = null

export function mountReveals(root: ParentNode = document) {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('rv-in')
          observer?.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  )

  root.querySelectorAll('.rv').forEach((el) => observer?.observe(el))
}

export function unmountReveals() {
  observer?.disconnect()
  observer = null
}
