import { validateModel } from '../validation'

export interface QueryParams {
  [field: string]: any
}

export interface ApiResponse<T> {
  message?: string
  ok: boolean
  status: number
  data?: T
}

interface ApiRequest<T = any> {
  body?: T
  query?: QueryParams
  model?: new () => T
}

export enum HttpMethods {
  Get = 'GET',
  Post = 'POST',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

function LogRequests() {
  return function (
    target: Function,
    _: string,
    descriptor: PropertyDescriptor
  ) {
    const originalFunction: Function = descriptor.value
    descriptor.value = async function (...args: any[]) {
      try {
        const [method, endpoint, request] = args
        const response = await originalFunction.call(target, ...args)
        if (process.env.NODE_ENV !== 'production') {
          console.log(`Made [${method}] API call to [${endpoint}]:`, {
            request,
            response,
          })
        }
        return response
      } catch (error) {
        console.error(error)
      }
    }

    return descriptor
  }
}
export class ApiClient {
  private static abortController = new AbortController()

  @LogRequests()
  private static async request<ResponseType = any, RequestType = any>(
    method: HttpMethods,
    endpoint: string,
    request?: ApiRequest<RequestType>
  ): Promise<ApiResponse<ResponseType>> {
    this.abortController = new AbortController()
    const base = process.env.REACT_APP_API_URL
    const headers: Headers = new Headers()
    headers.append('content-type', 'application/json')

    const requestContent: {
      body?: string
    } = {}

    if (request && request.query) {
      const query = Object.entries(request.query)
        .filter(([_, value]) => value)
        .map(([field, value]) => field + '=' + value)
        .join('&')
      endpoint += query ? '?' + query : ''
    }

    if (request && request.body && request.model) {
      const errors = await validateModel(request.body, request.model)

      if (errors.length) {
        if (process.env.NODE_ENV === 'development') {
          console.log(errors)
        }

        return { message: 'Invalid request', status: 500, ok: false }
      }

      requestContent.body = JSON.stringify(request.body)
    }

    try {
      const options: RequestInit = {
        headers,
        mode: 'cors',
        credentials: 'include',
        method,
        ...requestContent,
        signal: this.abortController.signal,
      }

      const response = await fetch(base + '/' + endpoint, options)
      const responseContent = (await response.json()) as ApiResponse<
        ResponseType
      >
      return responseContent
    } catch (error) {
      const { response } = error

      if (!response || response.status === 500) {
        const message =
          response.message ?? 'Error connecting to server. Try again'
        return { message, ok: false, status: 500 }
      }

      return response.data
    }
  }

  public static abort() {
    this.abortController.abort()
  }

  public static get<T>(endpoint: string, page?: number, query?: QueryParams) {
    return this.request<T>(HttpMethods.Get, endpoint, {
      query: { page, ...query },
    })
  }

  public static getOne<T>(endpoint: string, value: number | string) {
    return this.get<T>(`${endpoint}/${value}`)
  }

  public static post<ResponseType = any, RequestType = any>(
    endpoint: string,
    body?: RequestType,
    model?: any
  ) {
    return this.request<ResponseType>(HttpMethods.Post, endpoint, {
      body,
      model,
    })
  }

  public static postOne<ResponseType = any, RequestType = any>(
    endpoint: string,
    id: number | string,
    body?: RequestType,
    model?: any
  ) {
    return this.post<ResponseType, RequestType>(
      `${endpoint}/${id}`,
      body,
      model
    )
  }

  public static patch<ResponseType = any, RequestType = any>(
    endpoint: string,
    id?: number | string,
    body?: RequestType,
    model?: any
  ) {
    return this.request<ResponseType, RequestType>(
      HttpMethods.Patch,
      `${endpoint}/${id || ''}`,
      { body, model }
    )
  }

  public static delete<T = any>(endpoint: string) {
    return this.request<T>(HttpMethods.Delete, endpoint)
  }

  public static deleteOne<ResponseType = any, RequestType = any>(
    endpoint: string,
    id?: number | string,
    body?: RequestType,
    model?: any
  ) {
    return this.request<ResponseType, RequestType>(
      HttpMethods.Delete,
      `${endpoint}/${id || ''}`,
      { body, model }
    )
  }
}
