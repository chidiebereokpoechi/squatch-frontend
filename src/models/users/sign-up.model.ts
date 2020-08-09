import {
  IsEmail,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator'
import { BaseModel } from '../../types'
import { EmailNotTakenConstraint, UsernameNotTakenConstraint } from '../../util'
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_PATTERN,
} from '../../util/validation/constants'
import { ValidationMessages } from '../../util/validation/messages'

export class UserSignupModel implements BaseModel {
  @Validate(EmailNotTakenConstraint, { message: ValidationMessages.EmailTaken })
  @IsEmail({}, { message: ValidationMessages.EmailInvalid })
  public email: string = ''

  @Validate(UsernameNotTakenConstraint, {
    message: ValidationMessages.UsernameTaken,
  })
  @Matches(USERNAME_PATTERN, {
    message: ValidationMessages.UsernameInvalidCharacter,
  })
  @MaxLength(USERNAME_MAX_LENGTH, {
    message: ValidationMessages.TooLong,
  })
  @MinLength(USERNAME_MIN_LENGTH, {
    message: ValidationMessages.TooShort,
  })
  public username: string = ''

  @MaxLength(NAME_MAX_LENGTH, {
    message: ValidationMessages.TooLong,
  })
  @MinLength(NAME_MIN_LENGTH, {
    message: ValidationMessages.TooShort,
  })
  public name: string = ''

  @MaxLength(PASSWORD_MAX_LENGTH, {
    message: ValidationMessages.TooLong,
  })
  @MinLength(PASSWORD_MIN_LENGTH, {
    message: ValidationMessages.TooShort,
  })
  public password: string = ''

  public finalize() {}
}
