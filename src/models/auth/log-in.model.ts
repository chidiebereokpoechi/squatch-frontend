import { MinLength } from 'class-validator'
import { BaseModel } from '../../types'
import { ValidationMessages } from '../../util/validation/messages'

export class LogInModel implements BaseModel {
  @MinLength(1, { message: ValidationMessages.RequiredField })
  public usernameOrEmail: string = ''

  @MinLength(1, { message: ValidationMessages.RequiredField })
  public password: string = ''

  public finalize() {}
}
