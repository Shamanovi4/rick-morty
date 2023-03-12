import React from 'react'
import { Auth } from '../components/Auth/Auth'
import { Page } from '../hoc/Page/Page'

export const AuthPage: React.FC = () => {
  return (
    <Page>
      <Auth />
    </Page>
  )
}
