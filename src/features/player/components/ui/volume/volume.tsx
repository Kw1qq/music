import type { HoverCardDropdownProps, SliderProps } from '@mantine/core'

import { ActionIcon, HoverCard, Slider } from '@mantine/core'
import { Volume2, VolumeX } from 'lucide-react'

import { usePlayerStore } from '@/features/player/core/use-player-store'
import { mergeClassNames } from '@/utils/merge-class-names'

import { useVolume } from './use-volume'

import styles from './volume.module.css'

interface VolumeProps {
  dropDownClassNames?: HoverCardDropdownProps['classNames']
  sliderClassNames?: SliderProps['classNames']
}

const Volume = (props: VolumeProps) => {
  const { sliderClassNames, dropDownClassNames } = props

  const toggleMute = usePlayerStore((state) => state.toggleMute)
  const isMuting = usePlayerStore((state) => state.isMuting)
  const { volume, handlerChange, handlerChangeEnd } = useVolume()

  return (
    <HoverCard withArrow closeDelay={100} openDelay={100}>
      <HoverCard.Target>
        <ActionIcon classNames={{ root: styles.root }} onClick={toggleMute}>
          {isMuting ? (
            <VolumeX className={styles.mute} size={24} />
          ) : (
            <Volume2 className={styles.volume} size={24} />
          )}
        </ActionIcon>
      </HoverCard.Target>

      <HoverCard.Dropdown
        classNames={
          mergeClassNames(dropDownClassNames, {
            dropdown: styles.dropdown
          }) as HoverCardDropdownProps['classNames']
        }
      >
        <Slider
          classNames={sliderClassNames}
          orientation='vertical'
          value={volume}
          onChange={handlerChange}
          onChangeEnd={handlerChangeEnd}
        />
      </HoverCard.Dropdown>
    </HoverCard>
  )
}

export default Volume
