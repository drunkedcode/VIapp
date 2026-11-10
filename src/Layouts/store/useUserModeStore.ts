import { create } from 'zustand'

export type UserMode = 'person' | 'business'

interface UserModeState {
  mode: UserMode
  setMode: (mode: UserMode) => void
  toggleMode: () => void
}

export const useUserModeStore = create<UserModeState>((set) => ({
  mode: 'person', // por defecto: usuario normal

  setMode: (mode) => set({ mode }),

  toggleMode: () => set((state) => ({
    mode: state.mode === 'person' ? 'business' : 'person'
  }))
}))
