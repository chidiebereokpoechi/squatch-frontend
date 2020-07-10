import { orderBy } from 'lodash'
import { action, computed, observable, runInAction } from 'mobx'
import { CreatePrintModel } from '../models'
import { PrintsService } from '../services'
import { Print, PrintsState } from '../types'

class PrintsStore implements PrintsState {
  @observable private _feed: Record<number, Print> = {}
  @observable private _openPrint?: Print

  @action public listPrints = async () => {
    try {
      const response = await PrintsService.list()
      if (response.data) {
        runInAction(() => {
          ;(response.data as Print[]).forEach((print) => {
            this._feed[print.id] = print
          })
        })
      }
    } catch (e) {
      //
    }
  }

  @action public retrievePrint = async (id: number) => {
    try {
      const response = await PrintsService.retrieve(id)
      if (response.data) {
        runInAction(() => {
          this._openPrint = response.data as Print
        })
      }
    } catch (e) {
      //
    }
  }

  @action public createPrint = async (model: CreatePrintModel) => {
    try {
      const response = await PrintsService.create(model)
      if (response.data) {
        runInAction(() => {
          this._feed[response.data?.id as number] = response.data as Print
        })

        return response.data
      }
    } catch (e) {
      //
    }
  }

  @action public likePrint = async (id: number) => {
    try {
      const response = await PrintsService.like(id)

      if (response.data) {
        return response.data
      }
    } catch (e) {
      //
    }
  }

  @action public unlikePrint = async (id: number) => {
    try {
      const response = await PrintsService.unlike(id)
      if (response.data) {
        return response.data
      }
    } catch (e) {
      //
    }
  }

  @computed get feed() {
    return orderBy(this._feed, 'id', 'desc')
  }

  @computed get openPrint() {
    return this._openPrint
  }
}

export const printsStore = new PrintsStore()
