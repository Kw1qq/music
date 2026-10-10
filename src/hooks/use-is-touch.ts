import { useMediaQuery } from '@mantine/hooks'

export const useIsTouch = () => useMediaQuery('(pointer: coarse)')
