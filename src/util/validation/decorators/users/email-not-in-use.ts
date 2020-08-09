import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { UsersService } from '../../../../services'

@ValidatorConstraint({ async: true })
export class EmailNotTakenConstraint implements ValidatorConstraintInterface {
  public async validate(email: string, args: ValidationArguments) {
    try {
      const response = await UsersService.checkIfEmailTaken(email)
      return !response.data as boolean
    } catch (e) {
      return false
    }
  }
}

export function EmailNotTaken(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailNotTakenConstraint,
    })
  }
}
