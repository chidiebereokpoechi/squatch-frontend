import { action, computed, observable, runInAction } from 'mobx'
import { LogInModel } from '../models'
import { AuthService } from '../services'
import { AuthState, User } from '../types'

class AuthStore implements AuthState {
  @observable private _user?: User
  @observable private _ready: boolean = false

  @action public getAuthedUser = async () => {
    this._ready = false

    try {
      const response = await AuthService.getAuthedUser()
      if (response.data) {
        runInAction(() => {
          this._user = response.data
        })
      }
    } catch (e) {
      //
    } finally {
      this._ready = true
    }
  }

  @action public logIn = async (login: LogInModel) => {
    try {
      const response = await AuthService.logIn(login)
      if (response.data) {
        runInAction(() => {
          this._user = response.data
        })
      }
    } catch (e) {
      //
    }
  }

  @action public logOut = async () => {
    try {
      const response = await AuthService.logOut()
      if (response.ok) {
        runInAction(() => {
          this._user = undefined
        })
      }
    } catch (e) {
      //
    }
  }

  @computed public get user() {
    return this._user
  }

  @computed public get ready() {
    return this._ready
  }

  constructor() {
    this.getAuthedUser()
  }
}

export const authStore = new AuthStore()
