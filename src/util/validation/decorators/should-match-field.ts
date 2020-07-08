import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'

export function ShouldMatchField(
  field: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'shouldMatchField',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value === (args.object as any)[field]
        },
      },
    })
  }
}
