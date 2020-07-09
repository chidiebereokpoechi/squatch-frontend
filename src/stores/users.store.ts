import { action, computed, observable, runInAction } from 'mobx'
import { UserLoginModel, UserSignupModel } from '../models'
import { UsersService } from '../services'
import { User, UsersState } from '../types'
import { authStore } from './auth.store'

class UsersStore implements UsersState {
  @observable private _users: User[] = []
  @observable private _openUser?: User

  @action public listUsers = async () => {
    try {
      const response = await UsersService.list()
      if (response.data) {
        runInAction(() => {
          this._users = response.data as User[]
        })
      }
    } catch (e) {
      //
    }
  }

  @action public retrieveUser = async (username: string) => {
    try {
      const response = await UsersService.retrieve(username)
      if (response.data) {
        runInAction(() => {
          this._openUser = response.data as User
        })
      }
    } catch (e) {
      //
    }
  }

  @action public signUp = async (model: UserSignupModel) => {
    try {
      const response = await UsersService.signUp(model)
      if (response.data) {
        const login = new UserLoginModel()
        login.usernameOrEmail = model.username
        login.password = model.password

        authStore.logIn(login)
      }
    } catch (e) {
      //
    }
  }

  @computed get users() {
    return this._users
  }

  @computed get openUser() {
    return this._openUser
  }
}

export const usersStore = new UsersStore()
