export interface ApiResponse<T> {
  ok: boolean
  status: number
  message: string
  data?: T
  errors?: Record<string, string[]>
}
