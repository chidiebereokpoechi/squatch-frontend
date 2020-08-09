import { FormikProps, withFormik } from 'formik'
import React from 'react'
import { UserPlus } from 'react-feather'
import { Link } from 'react-router-dom'
import { EntryFormContainer, PrimaryButton } from '../../../components'
import { TextBox } from '../../../components/form'
import { UserSignupModel } from '../../../models'
import { usersStore } from '../../../stores/users.store'
import { validateModel } from '../../../util'

const Form: React.FC<FormikProps<UserSignupModel>> = ({
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
          <b>New Here?</b>
        </h3>
        <h5>Create an account to start printing!</h5>
      </header>
      <main
        className="mb-5"
        style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}
      >
        <TextBox placeholder="Email" name="email" disabled={shouldDisable} />
        <TextBox
          placeholder="Username"
          name="username"
          disabled={shouldDisable}
        />
        <TextBox placeholder="Name" name="name" disabled={shouldDisable} />
        <TextBox
          placeholder="Password"
          name="password"
          type="password"
          disabled={shouldDisable}
        />
      </main>
      <footer>
        <PrimaryButton
          type="submit"
          disabled={!isValid || shouldDisable}
          isLoading={shouldDisable}
        >
          <UserPlus className="icon" />
          <span>Sign up</span>
        </PrimaryButton>
        <div className="mt-3">
          <Link to="/log-in">Already have an account?</Link>
        </div>
      </footer>
    </EntryFormContainer>
  )
}

export const SignUpForm = withFormik<{}, UserSignupModel>({
  validate: (model: UserSignupModel) => validateModel(model),
  mapPropsToValues: () => new UserSignupModel(),
  handleSubmit: async (model: UserSignupModel) => {
    await usersStore.signUp(model)
  },
})(Form)
