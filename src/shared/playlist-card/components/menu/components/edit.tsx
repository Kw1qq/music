import { Menu } from '@mantine/core'
import { SquarePen } from 'lucide-react'

interface EditProps {
  onClick: () => void
}

const Edit = (props: EditProps) => {
  const { onClick } = props

  return (
    <Menu.Item leftSection={<SquarePen size={24} />} onClick={onClick}>
      Изменить
    </Menu.Item>
  )
}

export default Edit
