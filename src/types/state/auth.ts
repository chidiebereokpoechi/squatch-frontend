import { User } from '../entities'

export interface AuthState {
  user?: User
  ready: boolean
}
