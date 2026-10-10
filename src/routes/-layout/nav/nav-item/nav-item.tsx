import { Tooltip } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'

import type { RoutesProps } from '@/routes/-constants/routes'

import styles from './nav-item.module.css'

interface NavItemProps extends RoutesProps {
  open: boolean
}

const NavItem = (props: NavItemProps) => {
  const { to, title, icon, open } = props

  return (
    <Tooltip disabled={open} label={title} position='right'>
      <Link
        activeProps={{
          className: styles.linkActive
        }}
        className={styles.link}
        to={to}
      >
        <span className={styles.icon}>{icon}</span>
        <AnimatePresence>
          {open && (
            <motion.span
              transition={{
                duration: 0.1,
                ease: 'easeIn'
              }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              initial={{ x: -10, opacity: 0 }}
            >
              {title}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </Tooltip>
  )
}

export default NavItem
