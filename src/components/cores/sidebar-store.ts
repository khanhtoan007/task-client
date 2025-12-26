import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { UserProfile } from './type'
import { jwtDecode } from 'jwt-decode'
import { STORAGE_KEYS } from '@/constants'

interface SidebarState {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  userProfile: UserProfile | null
}

const getUserProfile = (): UserProfile | null => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    if (!token) return null
    return jwtDecode(token) as UserProfile
  } catch {
    return null
  }
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: false,
      setIsOpen: (isOpen: boolean) => set({ isOpen }),
      userProfile: getUserProfile(),
    }),
    {
      name: 'sidebar-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
