import { FormikProps, withFormik } from 'formik'
import React from 'react'
import { ChevronsRight } from 'react-feather'
import { Link } from 'react-router-dom'
import { EntryFormContainer, PrimaryButton } from '../../../components'
import { TextBox } from '../../../components/form'
import { LogInModel } from '../../../models'
import { authStore } from '../../../stores/auth.store'
import { validateModel } from '../../../util'

const Form: React.FC<FormikProps<LogInModel>> = ({
  isValidating,
  isSubmitting,
  isValid,
  handleSubmit,
}) => {
  const shouldDisable = isValidating || isSubmitting

  return (
    <EntryFormContainer onSubmit={handleSubmit}>
      <header>
        <h3>
          <b>Hey there</b>
        </h3>
        <h5>Welcome back</h5>
      </header>
      <main className="mb-5" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <TextBox placeholder="Username or email" name="usernameOrEmail" disabled={shouldDisable} />
        <TextBox placeholder="Password" name="password" type="password" disabled={shouldDisable} />
      </main>
      <footer>
        <PrimaryButton type="submit" disabled={!isValid || shouldDisable} isLoading={shouldDisable}>
          <ChevronsRight className="icon" />
          <span>Log in</span>
        </PrimaryButton>
        <div className="mt-3">
          <Link to="/sign-up">Sign up instead</Link>
        </div>
      </footer>
    </EntryFormContainer>
  )
}

export const LogInForm = withFormik<{}, LogInModel>({
  validate: (model: LogInModel) => validateModel(model),
  mapPropsToValues: () => new LogInModel(),
  handleSubmit: async (model: LogInModel) => {
    await authStore.logIn(model)
  },
})(Form)
