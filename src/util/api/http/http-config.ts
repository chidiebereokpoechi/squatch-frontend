import { AjaxRequest } from 'rxjs/ajax'
import { BaseModel, HttpClientRequestConfig } from '../../../types'

export class HttpConfig {
  private static token: string | null = null

  public static get authenticated(): boolean {
    return this.token !== null
  }

  public static get host(): string {
    return `${window.location.protocol}//${window.location.host}`
  }

  public static get isOrigin(): boolean {
    return process.env.REACT_APP_ROOT_URL === this.host
  }

  public static get bearerToken(): string {
    return `Bearer ${this.token}`
  }

  public static get corsOptions(): Pick<AjaxRequest, 'crossDomain'> {
    return {
      crossDomain: !this.isOrigin,
    }
  }

  public static getURL(url: string): string {
    const base = process.env.REACT_APP_BASE_URL
    return base + '/' + url
  }

  public static getConfig<RequestType extends BaseModel>({
    url,
    method,
    isFormData,
    request,
  }: HttpClientRequestConfig<RequestType>): Pick<
    AjaxRequest,
    'crossDomain' | 'url' | 'method' | 'headers' | 'body'
  > {
    const headers: Record<string, string> = {}

    if (!isFormData) {
      headers.Accept = 'application/json'
      headers['Content-Type'] = 'application/json'
    }

    if (HttpConfig.authenticated) {
      headers.Authorization = HttpConfig.bearerToken
    }

    if (request?.query) {
      url = Object.entries(request.query).reduce(
        (query, [key, value]) => query + key + '=' + value + '&',
        `${url}?`,
      )
    }

    if (request?.body) {
      request.body.finalize?.()
    }

    return { url: HttpConfig.getURL(url), method, headers, body: request?.body }
  }
}
