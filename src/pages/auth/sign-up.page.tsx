import React from 'react'
import { EntryPageWrapper, PageWrapper } from '../../components'
import { SignUpForm } from './forms'

export const SignUpPage: React.FC = () => {
  return (
    <PageWrapper>
      <EntryPageWrapper>
        <SignUpForm />
      </EntryPageWrapper>
    </PageWrapper>
  )
}
