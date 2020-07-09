import { AuthState } from './auth'
import { UsersState } from './users'

export interface ApplicationState {
  auth: AuthState
  users: UsersState
}
