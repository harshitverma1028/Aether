import { create } from 'zustand'

const useThemeStore = create((set) => ({

  darkMode: true,

  toggleTheme: () =>
    set((state) => ({
      darkMode: !state.darkMode,
    })),
}))

export default useThemeStore