import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

const styles = {
  primary: 'btn btn-primary',
  dark: 'btn btn-dark',
  outline: 'btn btn-outline',
  ghost: 'btn btn-ghost',
  skeleton: 'btn btn-skeleton',
}

export default function Button({
  to,
  href,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  children,
  className = '',
  withArrow = false,
  ariaLabel,
}) {
  const cls = `${styles[variant]} group ${className}`

  if (to) {
    return (
      <motion.span
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      >
        <Link to={to} className={cls} aria-label={ariaLabel}>
          {children}
          {withArrow && <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}
        </Link>
      </motion.span>
    )
  }

  if (href) {
    return (
      <motion.span whileHover={{ y: -2 }} whileTap={{ y: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 26 }}>
        <a href={href} className={cls} aria-label={ariaLabel} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
          {children}
          {withArrow && <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}
        </a>
      </motion.span>
    )
  }

  return (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 26 }}
    >
      <button type={type} onClick={onClick} disabled={disabled} className={cls} aria-label={ariaLabel}>
        {children}
        {withArrow && <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}
      </button>
    </motion.span>
  )
}