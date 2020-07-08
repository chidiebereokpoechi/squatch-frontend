export enum ValidationMessages {
  // Email validation
  EmailInUse = 'The email [$value] is already in use',
  EmailInvalid = 'Invalid email',

  UsernameInvalidCharacter = 'Only letters, underscores and numbers are allowed',

  // Generic
  RequiredField = 'This field is required',
  TooShort = 'Field must be a minimum of [$constraint1] character(s) long',
  TooLong = 'Field must be a maximum of [$constraint1] character(s) long',
}
