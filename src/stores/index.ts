import { ApplicationState } from '../types'
import { authStore } from './auth.store'
import { printsStore } from './prints.store'
import { usersStore } from './users.store'

export const applicationStore: ApplicationState = {
  auth: authStore,
  prints: printsStore,
  users: usersStore,
}
