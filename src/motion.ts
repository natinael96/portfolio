/** Shared @vueuse/motion presets — stronger entrance than default directives */

const ease = [0.22, 1, 0.36, 1] as const

export function motionEnterUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 44 },
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 780, delay, ease },
    },
  }
}

export function motionEnterDown(delay = 0) {
  return {
    initial: { opacity: 0, y: -36 },
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 780, delay, ease },
    },
  }
}

export function motionEnterRight(delay = 0) {
  return {
    initial: { opacity: 0, x: 56 },
    enter: {
      opacity: 1,
      x: 0,
      transition: { duration: 820, delay, ease },
    },
  }
}

export function motionVisibleOnceUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 52 },
    visibleOnce: {
      opacity: 1,
      y: 0,
      transition: { duration: 850, delay, ease },
    },
  }
}

export function motionVisibleOnceLeft(delay = 0) {
  return {
    initial: { opacity: 0, x: -40 },
    visibleOnce: {
      opacity: 1,
      x: 0,
      transition: { duration: 800, delay, ease },
    },
  }
}
