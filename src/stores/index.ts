import { ApplicationState } from '../types'
import { authStore } from './auth.store'

export const applicationStore: ApplicationState = {
  auth: authStore,
}
