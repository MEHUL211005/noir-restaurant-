export const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1, ease: 'easeOut', delay },
  }),
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
}

export const slideIn = {
  hidden: { opacity: 0, x: 48 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
}

export const viewport = { once: true, margin: '-80px' }

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.35, ease: 'easeIn' } },
}

export const modalTransition = {
  initial: { opacity: 0, scale: 0.94, y: 24 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.25, ease: 'easeIn' } },
}

export const drawerTransition = {
  initial: { x: '100%' },
  animate: { x: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { x: '100%', transition: { duration: 0.35, ease: 'easeIn' } },
}