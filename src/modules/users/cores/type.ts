export interface UserResponse {
  id: string
  name: string
  email: string
  phone: string
  contest: string
  dob: string
  sex: string
  created_at: string
  updated_at: string
}

export interface UserRequest {
  name: string
  dob: string
  sex: string
  email: string
  phone: string
  contest: string
}

export interface ContestResponse {
    id: string
    title: string
    contest_address: string
    range: string
    created_at: string
    updated_at: string
}

