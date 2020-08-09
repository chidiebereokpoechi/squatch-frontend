import React from 'react'
import { EntryPageWrapper, PageWrapper } from '../../components'
import { LogInForm } from './forms'

export const LogInPage: React.FC = () => {
  return (
    <PageWrapper>
      <EntryPageWrapper>
        <LogInForm />
      </EntryPageWrapper>
    </PageWrapper>
  )
}
