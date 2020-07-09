import { ApplicationState } from '../types'
import { authStore } from './auth.store'
import { usersStore } from './users.store'

export const applicationStore: ApplicationState = {
  auth: authStore,
  users: usersStore,
}
