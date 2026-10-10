import { create } from 'zustand'

interface DragState {
  isDragging: boolean
  setDragging: (val: boolean) => void
}

export const useDragStore = create<DragState>((set) => ({
  isDragging: false,
  setDragging: (value) => set({ isDragging: value })
}))
