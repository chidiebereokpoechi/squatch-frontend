import socketIOClient from 'socket.io-client'

export class SocketApiClient {
  private _socket: SocketIOClient.Socket

  constructor(namespace: string) {
    this._socket = socketIOClient(
      `${process.env.REACT_APP_BASE_URL}/${namespace}`
    )
  }

  public async emit<T = unknown>(code: string, payload?: T) {
    this._socket.emit(code, { payload })
  }

  public destroy() {
    this._socket.disconnect()
  }
}
