import { Field, FormikProps, withFormik } from 'formik'
import { isMatch } from 'lodash'
import React from 'react'
import { Plus } from 'react-feather'
import { PrimaryButton } from '../../../components'
import { CreatePrintModel } from '../../../models'
import { printsStore } from '../../../stores/prints.store'
import { blockNavigation } from '../../../util'
import { CreatePrintContainer } from '../components'

export const Form: React.FC<FormikProps<CreatePrintModel>> = ({
  isValidating,
  isSubmitting,
  values,
  initialValues,
  handleSubmit,
}) => {
  const shouldDisable = isValidating || isSubmitting

  React.useEffect(() => {
    if (!isMatch(values, initialValues)) {
      const { unBlock } = blockNavigation()

      return () => {
        unBlock()
      }
    }
  }, [values, initialValues])

  return (
    <CreatePrintContainer onSubmit={handleSubmit}>
      <main>
        <Field
          name="content"
          disabled={shouldDisable}
          as="textarea"
          placeholder="Make an impression. Say something"
        />
      </main>
      <footer>
        <PrimaryButton type="submit" disabled={shouldDisable}>
          <Plus className="icon" />
          <span>Print</span>
        </PrimaryButton>
      </footer>
    </CreatePrintContainer>
  )
}

export const CreatePrintForm = withFormik<{}, CreatePrintModel>({
  mapPropsToValues: () => new CreatePrintModel(),
  handleSubmit: async (model: CreatePrintModel, helpers) => {
    const response = await printsStore.createPrint(model)

    if (response) {
      helpers.resetForm()
    }
  },
})(Form)
