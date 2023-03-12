import React from 'react'
import './App.scss'
import { Layout } from './hoc/Layout/Layout'
import { CharactersListPage } from './pages/CharactersListPage'
import { Route, Routes } from 'react-router-dom'
import { CharacterPage } from './pages/CharacterPage'
import { AuthPage } from './pages/AuthPage'

export const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route
          path='/'
          element={<CharactersListPage />}
        />
        <Route
          path='/character/:id'
          element={<CharacterPage />}
        />
        <Route
          path='/auth'
          element={<AuthPage />}
        />
      </Routes>
    </Layout>
  )
}
