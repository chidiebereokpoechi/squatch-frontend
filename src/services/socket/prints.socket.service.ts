import { SocketApiClient } from '../../util'

export class PrintsSocketService {
  private socketClient: SocketApiClient

  constructor() {
    this.socketClient = new SocketApiClient('prints')
  }

  public destruct() {
    this.socketClient.destroy()
  }

  public async createPrint(id: number) {
    this.socketClient.emit('create', { id })
  }
}
