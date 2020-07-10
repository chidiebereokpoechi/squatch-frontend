import { AuthState } from './auth'
import { PrintsState } from './prints'
import { UsersState } from './users'

export interface ApplicationState {
  auth: AuthState
  prints: PrintsState
  users: UsersState
}
