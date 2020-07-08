import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { UsersService } from '../../../../services'

@ValidatorConstraint({ async: true })
export class UsernameNotInUseConstraint
  implements ValidatorConstraintInterface {
  public async validate(username: string, args: ValidationArguments) {
    try {
      const response = await UsersService.checkIfUsernameTaken(username)
      return response.data as boolean
    } catch (e) {
      return false
    }
  }
}

export function UsernameNotInUse(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: UsernameNotInUseConstraint,
    })
  }
}
