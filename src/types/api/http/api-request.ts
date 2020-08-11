import { BaseModel } from '../../models'

export interface ApiRequest<T extends BaseModel = any> {
  body?: T
  query?: Record<string, string | number>
  model?: T
}
