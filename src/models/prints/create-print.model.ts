import { MaxLength, MinLength } from 'class-validator'
import { PRINT_CONTENT_MAX_LENGTH, PRINT_CONTENT_MIN_LENGTH } from '../../util/validation/constants'
import { ValidationMessages } from '../../util/validation/messages'

export class CreatePrintModel {
  @MinLength(PRINT_CONTENT_MIN_LENGTH, { message: ValidationMessages.TooShort })
  @MaxLength(PRINT_CONTENT_MAX_LENGTH, { message: ValidationMessages.TooLong })
  public content: string = ''
}
