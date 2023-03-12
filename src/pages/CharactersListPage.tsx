import React from 'react'
import { CharactersList } from '../components/CharactersList/CharactersList'
import { Page } from '../hoc/Page/Page'

export const CharactersListPage: React.FC = () => {
  return (
    <Page>
      <CharactersList />
    </Page>
  )
}
