import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { LoginRequest, RegisterRequest } from '@/modules/auth/cores/type'
import { login, register } from '@/modules/auth/services/auth.service'

interface AuthState {
  user: null | Record<string, unknown>
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginRequest) => Promise<void>
  register: (credentials: RegisterRequest) => Promise<void>
  logout: () => void
  setTokens: (accessToken: string, refreshToken: string) => void
}

export const useAuthStore = create<AuthState>()(
  // Use 'persist' middleware to save the state in localStorage
  persist(
    (set) => ({
      user: null, // Stores user data after login
      token: null, // Stores the JWT or session token
      refreshToken: null, // Stores the refresh token
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Action to handle the login process
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null })
        try {
          const response = await login(credentials)
          if (response.success && response.data.access_token) {
            set({
              token: response.data.access_token,
              refreshToken: response.data.refresh_token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          } else {
            set({
              error: response.message || 'Login failed',
              isLoading: false,
            })
          }
        } catch (err) {
          set({
            error: 'Invalid credentials or server error',
            isLoading: false,
          })
          throw err
        }
      },

      // Action to handle the register process
      register: async (credentials: RegisterRequest) => {
        set({ isLoading: true, error: null })
        try {
          const response = await register(credentials)
          if (response.success && response.data.access_token) {
            set({
              token: response.data.access_token,
              refreshToken: response.data.refresh_token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          } else {
            set({
              error: response.message || 'Registration failed',
              isLoading: false,
            })
          }
        } catch (err) {
          set({
            error: 'Registration failed. Please try again.',
            isLoading: false,
          })
          throw err
        }
      },

      // Action to set tokens directly (useful for external token updates)
      setTokens: (accessToken: string, refreshToken: string) => {
        set({
          token: accessToken,
          refreshToken: refreshToken,
          isAuthenticated: true,
        })
      },

      // Action to handle logout
      logout: () => {
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
