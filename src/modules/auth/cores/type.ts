export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  email: string
  password: string
  name: string
}

export type LoginResponse = {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

export type RefreshTokenRequest = {
  refresh_token: string
}
