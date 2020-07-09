import { UserLoginModel } from '../models'
import { User } from '../types'
import { ApiClient } from '../util'

export class AuthService {
  public static async getAuthedUser() {
    return ApiClient.get<User>('auth')
  }

  public static async logOut() {
    return ApiClient.delete('auth')
  }

  public static async logIn(body: UserLoginModel) {
    return ApiClient.post<User>('auth', body, UserLoginModel)
  }
}
