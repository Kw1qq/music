import { ActionIcon, Tooltip } from '@mantine/core'
import { useLocalStorage, useMediaQuery } from '@mantine/hooks'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

import { routes } from '@/routes/-constants/routes'

import NavItem from './nav-item'

import styles from './nav.module.css'

const Nav = () => {
  const isTablet = useMediaQuery('(max-width: 1200px)')
  const isMobile = useMediaQuery('(max-width: 500px)')

  const [open, setOpen] = useLocalStorage({
    key: 'sidebar',
    defaultValue: false
  })

  return (
    <motion.nav
      animate={{
        width: isMobile ? '' : isTablet ? '72px' : open ? 'auto' : '72px'
      }}
      className={styles.nav}
      transition={{ duration: 0.15 }}
    >
      <Tooltip.Group closeDelay={100} openDelay={200}>
        <ul className={styles.list}>
          {routes.map((route, index) => (
            <li key={index} className={styles.item}>
              <NavItem {...route} open={isTablet ? false : open} />
            </li>
          ))}
        </ul>
      </Tooltip.Group>

      {isMobile || isTablet || (
        <ActionIcon
          classNames={{ root: styles.button, icon: styles.icon }}
          onClick={() => setOpen(!open)}
        >
          {open ? <ArrowLeft height={12} width={12} /> : <ArrowRight height={12} width={12} />}
        </ActionIcon>
      )}
    </motion.nav>
  )
}

export default Nav
