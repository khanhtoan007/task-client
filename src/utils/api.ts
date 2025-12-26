import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { APIResponseError, APIResponseStandard } from '@/types/response'
import toast from 'react-hot-toast'
import { API_BASE_URL } from '@/constants'
import { useAuthStore } from '@/hooks/useAuthStore'
import { refreshToken as refreshTokenService } from '@/modules/auth/services/auth.service'

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

let isRefreshing = false
let failedQueue: Array<(token: string) => void> = []

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Zustand store
    const token = useAuthStore.getState().token
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<APIResponseError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status !== 401 || originalRequest._retry) {
      toast.error(error.response?.data?.message || error.message)
      return Promise.reject(error)
    }

    originalRequest._retry = true

    if (isRefreshing) {
      return new Promise((resolve) => {
        failedQueue.push((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          resolve(apiClient(originalRequest))
        })
      })
    }

    isRefreshing = true

    try {
      const { refreshToken, setTokens } = useAuthStore.getState()

      if (!refreshToken) throw new Error('No refresh token')

      const res = await refreshTokenService({ refresh_token: refreshToken })

      setTokens(res.data.access_token, res.data.refresh_token)

      failedQueue.forEach((cb) => cb(res.data.access_token))
      failedQueue = []

      originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`
      return apiClient(originalRequest)
    } catch (err) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
      toast.error('Session expired. Please login again.')
      return Promise.reject(err)
    } finally {
      isRefreshing = false
    }
  }
)

export default apiClient
