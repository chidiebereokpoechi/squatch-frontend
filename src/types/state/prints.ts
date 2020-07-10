import { Print } from '../entities'

export interface PrintsState {
  openPrint?: Print
  feed: Print[]
}
