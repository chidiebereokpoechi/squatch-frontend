import { validate } from 'class-validator'
import { BaseModel } from '../../types'
import { mapErrorsToRecord } from './map-errors-to-record'

export async function validateModel<T extends BaseModel = any>(values: T, model?: new () => T) {
  if (model) {
    values = { ...new model(), ...values }
  }

  values?.transform?.()
  values?.finalize?.()

  const validationErrors = await validate(values, {
    whitelist: true,
  })

  const mappedErrors = mapErrorsToRecord(validationErrors)
  return mappedErrors
}
