import {
  ActionIcon,
  Button,
  Chip,
  createTheme,
  Drawer,
  DrawerCloseButton,
  DrawerRoot,
  DrawerTitle,
  HoverCard,
  Input,
  Loader,
  Menu,
  Modal,
  Notification,
  Popover,
  ScrollArea,
  SegmentedControl,
  Select,
  Slider,
  Switch,
  TextInput,
  Tooltip
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { Dropzone } from '@mantine/dropzone'
import { X } from 'lucide-react'

import actionIconStyles from '@/assets/styles/mantine-components/action-icon.module.css'
import buttonStyles from '@/assets/styles/mantine-components/button.module.css'
import chipStyles from '@/assets/styles/mantine-components/chip.module.css'
import datePickerInputStyles from '@/assets/styles/mantine-components/date-picker-input.module.css'
import drawerCloseButtonStyles from '@/assets/styles/mantine-components/drawer-close-button.module.css'
import drawerTitleStyles from '@/assets/styles/mantine-components/drawer-title.module.css'
import drawerStyles from '@/assets/styles/mantine-components/drawer.module.css'
import dropzoneStyles from '@/assets/styles/mantine-components/dropzone.module.css'
import hoverCardStyles from '@/assets/styles/mantine-components/hover-card.module.css'
import inputStyles from '@/assets/styles/mantine-components/input.module.css'
import loaderStyles from '@/assets/styles/mantine-components/loader.module.css'
import menuStyles from '@/assets/styles/mantine-components/menu.module.css'
import modalStyles from '@/assets/styles/mantine-components/modal.module.css'
import notificationStyles from '@/assets/styles/mantine-components/notification.module.css'
import popoverStyles from '@/assets/styles/mantine-components/popover.module.css'
import scrollAreaStyles from '@/assets/styles/mantine-components/scroll-area.module.css'
import segmentedControlStyles from '@/assets/styles/mantine-components/segmented-control.module.css'
import selectStyles from '@/assets/styles/mantine-components/select.module.css'
import sliderStyles from '@/assets/styles/mantine-components/slider.module.css'
import switchStyles from '@/assets/styles/mantine-components/switch.module.css'
import textInputStyles from '@/assets/styles/mantine-components/text-input.module.css'
import tooltipStyles from '@/assets/styles/mantine-components/tooltip.module.css'

export const theme = createTheme({
  fontFamily: 'Montserrat',
  colors: {
    gray: [
      '#f5f5f5',
      '#e7e7e7',
      '#cdcdcd',
      '#b2b2b2',
      '#9a9a9a',
      '#8b8b8b',
      '#848484',
      '#717171',
      '#656565',
      '#0b0b0b'
    ],
    grayAlt: [
      '#f5f5f5',
      '#e7e7e7',
      '#cdcdcd',
      '#b2b2b2',
      '#9a9a9a',
      '#8b8b8b',
      '#848484',
      '#717171',
      '#656565',
      '#171717'
    ],
    graySecondary: [
      '#f5f5f5',
      '#e7e7e7',
      '#cdcdcd',
      '#b2b2b2',
      '#9a9a9a',
      '#8b8b8b',
      '#848484',
      '#717171',
      '#656565',
      '#0f0f0f'
    ],
    black: [
      '#f5f5f5',
      '#e7e7e7',
      '#cdcdcd',
      '#b2b2b2',
      '#9a9a9a',
      '#8b8b8b',
      '#848484',
      '#717171',
      '#656565',
      '#000000'
    ],
    white: [
      '#ffffff',
      '#e7e7e7',
      '#cdcdcd',
      '#b2b2b2',
      '#9a9a9a',
      '#8b8b8b',
      '#848484',
      '#717171',
      '#656565',
      '#575757'
    ],
    whiteAlt: [
      '#f7f7f7',
      '#e7e7e7',
      '#cdcdcd',
      '#b2b2b2',
      '#9a9a9a',
      '#8b8b8b',
      '#848484',
      '#717171',
      '#656565',
      '#575757'
    ],
    red: [
      '#ffe7e8',
      '#ffcece',
      '#ff9b9b',
      '#ff5050',
      '#fe3736',
      '#fe1b19',
      '#ff0909',
      '#e40000',
      '#cb0000',
      '#b20000'
    ],
    blue: [
      '#e7f7ff',
      '#d8e9f7',
      '#b5d0e6',
      '#8eb5d5',
      '#6e9fc7',
      '#5891bf',
      '#4c8abc',
      '#3b77a6',
      '#2f6a96',
      '#1a5c86'
    ]
  },
  autoContrast: true,
  components: {
    Button: Button.extend({
      classNames: buttonStyles
    }),
    ActionIcon: ActionIcon.extend({
      classNames: actionIconStyles
    }),
    Tooltip: Tooltip.extend({
      classNames: tooltipStyles,
      defaultProps: {
        openDelay: 200
      }
    }),
    Slider: Slider.extend({
      classNames: sliderStyles
    }),
    HoverCard: HoverCard.extend({
      classNames: hoverCardStyles
    }),
    TextInput: TextInput.extend({
      classNames: textInputStyles
    }),
    Input: Input.extend({ classNames: inputStyles }),
    Loader: Loader.extend({
      classNames: loaderStyles
    }),
    Drawer: Drawer.extend({
      classNames: drawerStyles,
      defaultProps: { closeOnEscape: false }
    }),
    DrawerRoot: DrawerRoot.extend({
      defaultProps: { closeOnEscape: false }
    }),
    DrawerCloseButton: DrawerCloseButton.extend({
      defaultProps: {
        icon: <X size={24} />,
        classNames: drawerCloseButtonStyles
      }
    }),
    DrawerTitle: DrawerTitle.extend({
      defaultProps: {
        classNames: drawerTitleStyles
      }
    }),
    Menu: Menu.extend({
      classNames: menuStyles
    }),
    Select: Select.extend({
      classNames: selectStyles,
      defaultProps: {
        comboboxProps: {
          transitionProps: { transition: 'fade-up', duration: 200 }
        },
        wrapperProps: {
          onMouseDown: (e) => e.preventDefault()
        }
      }
    }),
    DatePickerInput: DatePickerInput.extend({ classNames: datePickerInputStyles }),
    ScrollArea: ScrollArea.extend({
      classNames: scrollAreaStyles
    }),
    Popover: Popover.extend({
      classNames: popoverStyles
    }),
    Switch: Switch.extend({
      classNames: switchStyles
    }),
    Dropzone: Dropzone.extend({
      classNames: dropzoneStyles
    }),
    Modal: Modal.extend({
      classNames: modalStyles,
      defaultProps: {
        closeButtonProps: {
          icon: <X size={24} />
        }
      }
    }),
    SegmentedControl: SegmentedControl.extend({
      classNames: segmentedControlStyles
    }),
    Chip: Chip.extend({
      classNames: chipStyles,
      defaultProps: {
        icon: null
      }
    }),
    Notification: Notification.extend({
      classNames: notificationStyles
    })
  }
})
