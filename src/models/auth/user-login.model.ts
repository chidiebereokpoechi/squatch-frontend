import { IsString } from 'class-validator'
import { BaseModel } from '../../types'
import { ValidationMessages } from '../../util/validation/messages'

export class UserLoginModel implements BaseModel {
  @IsString({ message: ValidationMessages.RequiredField })
  public usernameOrEmail: string = ''

  @IsString({ message: ValidationMessages.RequiredField })
  public password: string = ''

  public finalize() {}
}
