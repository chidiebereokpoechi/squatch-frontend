import { CreatePrintModel } from '../models'
import { Print } from '../types'
import { ApiClient } from '../util'

export class PrintsService {
  public static async create(body: CreatePrintModel) {
    return ApiClient.post<Print>('prints', body, CreatePrintModel)
  }

  public static async list(page?: number) {
    return ApiClient.get<Print[]>('prints', page)
  }

  public static async retrieve(id: number) {
    return ApiClient.getOne<Print>('prints', id)
  }

  public static async like(id: number) {
    return ApiClient.post<Print>(`prints/${id}/likers`)
  }

  public static async unlike(id: number) {
    return ApiClient.delete<Print>(`prints/${id}/likers`)
  }
}
