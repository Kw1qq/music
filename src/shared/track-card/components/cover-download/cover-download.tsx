import type { ReactNode } from 'react'

import { Loader } from '@mantine/core'
import { Download } from 'lucide-react'

import { mergeClassNamesObject } from '@/utils/merge-class-names-object'

import type { CoverActionProps } from '../cover-action/cover-action'

import CoverAction from '../cover-action'

import styles from './cover-download.module.css'

interface CoverDownloadProps {
  classNames?: CoverActionProps['classNames']
  cover: ReactNode
  isLoading: boolean
  onDownload: () => void
}

const CoverDownload = (props: CoverDownloadProps) => {
  const { cover, classNames, onDownload, isLoading } = props

  return (
    <CoverAction
      classNames={mergeClassNamesObject(classNames, { button: styles.button })}
      cover={cover}
      icon={isLoading ? <Loader className={styles.loader} size={24} /> : <Download size={24} />}
      onClick={onDownload}
    />
  )
}

export default CoverDownload
