import type { Area, Point } from 'react-easy-crop'

import { Button, Modal } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { Camera, Upload, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'

import { getSignedMediaUrl } from '@/utils/get-signed-media-url'

import { getCroppedBlob } from './utils/get-cropped-blob'

import styles from './image-cropper.module.css'

interface ImageCropperProps {
  aspect?: number
  value?: string | File | null
  onChange: (file: File | null) => void
}

const ImageCropper = ({ value, onChange, aspect = 1 }: ImageCropperProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [open, setOpen] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null)
      return
    }
    if (typeof value === 'string') {
      setPreviewUrl(getSignedMediaUrl(value))
    } else if (value instanceof File) {
      const url = URL.createObjectURL(value)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [value])

  useEffect(
    () => () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
    },
    [imageUrl]
  )

  const handleFileDrop = (files: File[]) => {
    const file = files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      setOpen(true)
    }
  }

  const handleCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleApply = async () => {
    setOpen(false)
    if (imageUrl && croppedAreaPixels) {
      try {
        const blob = await getCroppedBlob(imageUrl, croppedAreaPixels)
        const croppedFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' })
        onChange(croppedFile)
      } catch (e) {
        console.error('Ошибка кадрирования:', e)
      }
    }
  }

  const handleClear = () => {
    setOpen(false)
    setPreviewUrl(null)
    setImageUrl(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedAreaPixels(null)
    onChange(null)
  }

  return (
    <>
      <Dropzone
        style={{
          aspectRatio: aspect
        }}
        accept={IMAGE_MIME_TYPE}
        classNames={{ root: styles.dropzone }}
        maxFiles={1}
        maxSize={5 * 1024 ** 2}
        multiple={false}
        onDrop={handleFileDrop}
      >
        <div className={styles.dropzoneInner}>
          <Dropzone.Accept>
            <Upload size={24} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <X size={24} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <Camera size={24} />
          </Dropzone.Idle>
          <Button>Выбрать файл</Button>
        </div>
        {previewUrl && <img alt='preview' className={styles.preview} src={previewUrl} />}
      </Dropzone>
      <Modal
        classNames={{ body: styles.body }}
        opened={open}
        title='Редактировать обложку'
        onClose={handleClear}
      >
        {imageUrl && (
          <>
            <div className={styles.cropper} style={{ aspectRatio: aspect }}>
              <Cropper
                aspect={aspect}
                crop={crop}
                image={imageUrl}
                zoom={zoom}
                onCropChange={setCrop}
                onCropComplete={handleCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className={styles.actions}>
              <Button variant='outline' onClick={handleClear}>
                Отменить
              </Button>
              <Button onClick={handleApply}>Применить</Button>
            </div>
          </>
        )}
      </Modal>
    </>
  )
}

export default ImageCropper
