import { User } from '../entities'

export interface UsersState {
  openUser?: User
  users: User[]
}
