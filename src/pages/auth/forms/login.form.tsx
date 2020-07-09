import { Field, FormikProps, withFormik } from 'formik'
import React from 'react'
import { EntryFormContainer } from '../../../components'
import { UserLoginModel } from '../../../models'
import { authStore } from '../../../stores/auth.store'

export const Form: React.FC<FormikProps<UserLoginModel>> = ({
  isValidating,
  isSubmitting,
  isValid,
  handleSubmit,
}) => {
  const shouldDisable = isValidating || isSubmitting

  return (
    <EntryFormContainer onSubmit={handleSubmit}>
      <header>
        <h1>
          <b>Hey there</b>
        </h1>
        <h5>Welcome back</h5>
      </header>
      <main>
        <Field name="usernameOrEmail" disabled={shouldDisable} />
        <Field name="password" type="password" disabled={shouldDisable} />
      </main>
      <button type="submit" disabled={!isValid || shouldDisable}>
        Log in
      </button>
    </EntryFormContainer>
  )
}

export const LoginForm = withFormik<{}, UserLoginModel>({
  mapPropsToValues: () => new UserLoginModel(),
  handleSubmit: async (model: UserLoginModel) => {
    await authStore.logIn(model)
  },
})(Form)
