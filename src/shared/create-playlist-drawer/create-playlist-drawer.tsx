import type { SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Drawer, Switch, TextInput } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useMutation } from '@tanstack/react-query'
import { Check, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'

import { patchPlaylistMutationOptions } from '@/api/playlists/patch-playlist/patch-playlist-mutation-options'
import { postCreatePlaylistMutationOptions } from '@/api/playlists/post-create-playlist/post-create-playlist-mutation-options'

import ImageCropper from '../image-cropper'

import styles from './create-playlist-drawer.module.css'

const playlistFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: 'Название обязательно' })
    .max(30, { error: 'Название не должно быть длиннее 30 символов' }),
  isPublic: z.boolean(),
  cover: z.union([z.instanceof(File), z.url('Ссылка на обложку некорректна')]).optional()
})

type playlistFormType = z.infer<typeof playlistFormSchema>

interface CreatePlaylistDrawerProps {
  defaultValues?: playlistFormType
  id?: string
  opened: boolean
  onClose: () => void
}

const DEFAULT_VALUES = {
  name: '',
  isPublic: false,
  cover: undefined
}

const CreatePlaylistDrawer = (props: CreatePlaylistDrawerProps) => {
  const { onClose, opened, defaultValues, id } = props

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<playlistFormType>({
    values: defaultValues ?? DEFAULT_VALUES,
    resolver: zodResolver(playlistFormSchema)
  })

  const isMobile = useMediaQuery('(width < 500px)')

  const postCreatePlaylistMutation = useMutation(postCreatePlaylistMutationOptions())
  const patchPlaylistMutation = useMutation(patchPlaylistMutationOptions(id ?? ''))

  const isEditing = !!id
  const isLoading = isEditing
    ? patchPlaylistMutation.isPending
    : postCreatePlaylistMutation.isPending

  const onSubmit: SubmitHandler<playlistFormType> = async (playlist) => {
    const payload = {
      name: playlist.name,
      isPublic: playlist.isPublic,
      cover: playlist.cover instanceof File ? playlist.cover : undefined
    }
    if (isEditing) {
      await patchPlaylistMutation.mutateAsync(payload)
    } else {
      await postCreatePlaylistMutation.mutateAsync(payload)
    }
    onClose()
  }

  return (
    <Drawer.Root
      opened={opened}
      position={isMobile ? 'bottom' : 'left'}
      onClick={(e) => e.stopPropagation()}
      onClose={onClose}
      onExitTransitionEnd={reset}
    >
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>{isEditing ? 'Редактировать плейлист' : 'Создать плейлист'}</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body className={styles.body}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.wrapper}>
              <Controller
                render={({ field }) => (
                  <ImageCropper
                    aspect={1}
                    value={field.value}
                    onChange={(file) => field.onChange(file)}
                  />
                )}
                control={control}
                name='cover'
              />
              <div className={styles.data}>
                <TextInput
                  className={styles.name}
                  {...register('name')}
                  error={'name' in errors ? errors.name?.message : ''}
                  label='Название плейлиста'
                  placeholder='название'
                />
                <Controller
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      label='сделать публичным'
                      thumbIcon={field.value ? <Check size={10} /> : <X size={10} />}
                      onChange={(event) => field.onChange(event.currentTarget.checked)}
                    />
                  )}
                  control={control}
                  name='isPublic'
                />
              </div>
            </div>
            <div className={styles.actions}>
              <Button variant='outline' onClick={onClose}>
                Отменить
              </Button>
              <Button loading={isLoading} type='submit'>
                {isEditing ? 'Изменить' : 'Создать'}
              </Button>
            </div>
          </form>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  )
}

export default CreatePlaylistDrawer
