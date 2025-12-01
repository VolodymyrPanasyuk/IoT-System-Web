import { create } from 'zustand'

interface LoadingState {
  loadingStates: Map<string, boolean>
  globalLoading: boolean
  globalLoadingMessage: string
}

interface LoadingActions {
  startLoading: (key: string) => void
  stopLoading: (key: string) => void
  isLoading: (key: string) => boolean
  showGlobalLoading: (message?: string) => void
  hideGlobalLoading: () => void
}

type LoadingStore = LoadingState & LoadingActions

export const useLoadingStore = create<LoadingStore>((set, get) => ({
  loadingStates: new Map(),
  globalLoading: false,
  globalLoadingMessage: '',

  startLoading: (key: string) => {
    set((state) => {
      const newMap = new Map(state.loadingStates)
      newMap.set(key, true)
      return { loadingStates: newMap }
    })
  },

  stopLoading: (key: string) => {
    set((state) => {
      const newMap = new Map(state.loadingStates)
      newMap.set(key, false)
      return { loadingStates: newMap }
    })
  },

  isLoading: (key: string) => {
    return get().loadingStates.get(key) ?? false
  },

  showGlobalLoading: (message = 'Завантаження...') => {
    set({ globalLoading: true, globalLoadingMessage: message })
  },

  hideGlobalLoading: () => {
    set({ globalLoading: false, globalLoadingMessage: '' })
  },
}))
