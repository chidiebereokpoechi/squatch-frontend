import { UserSignupModel } from '../models'
import { User } from '../types'
import { ApiClient } from '../util/api'

export class UsersService {
  public static async checkIfEmailTaken(email: string) {
    return ApiClient.getOne<boolean>('users/exists/email', email)
  }

  public static async checkIfUsernameTaken(username: string) {
    return ApiClient.getOne<boolean>('users/exists/username', username)
  }

  public static async signUp(body: UserSignupModel) {
    return ApiClient.post<User>('users', body, UserSignupModel)
  }

  public static async list(page?: number) {
    return ApiClient.get<User[]>('users', page)
  }
}
