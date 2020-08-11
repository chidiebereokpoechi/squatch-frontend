import { ApiRequest } from './api-request'
import { HttpMethod } from './http-method'

export interface HttpClientRequestConfig<RequestType> {
  url: string
  method: HttpMethod
  isFormData?: boolean
  request?: ApiRequest<RequestType>
}
