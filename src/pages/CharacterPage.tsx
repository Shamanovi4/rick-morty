import React from 'react'
import { Character } from '../components/Character/Character'
import { Page } from '../hoc/Page/Page'

export const CharacterPage: React.FC = () => {
  return (
    <Page>
      <Character />
    </Page>
  )
}
