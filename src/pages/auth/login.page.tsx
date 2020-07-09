import React from 'react'
import { EntryPageWrapper, PageWrapper } from '../../components'
import { LoginForm } from './forms'

export const LoginPage = () => {
  return (
    <PageWrapper>
      <EntryPageWrapper>
        <LoginForm />
      </EntryPageWrapper>
    </PageWrapper>
  )
}
