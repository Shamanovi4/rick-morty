import React, { useEffect, useState } from 'react'
import { getCharacters } from 'rickmortyapi'
import { CharactersCard } from '../CharacterCard/CharacterCard'
import RickMorty from '../../assets/images/RickMorty.png'
import classes from './CharactersList.module.scss'
import { PageControls } from '../PageControls/PageControls'
import { Login } from '../Login/Login'

function compare(a: { name: string }, b: { name: string }) {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

export const CharactersList: React.FC = () => {
  const [characters, setCharacters] = useState<any>([])
  const localSearch = localStorage.getItem('search')
    ? localStorage.getItem('search')
    : ''
  const [search, setSearch] = useState<any>(localSearch)
  const localPageNumber = localStorage.getItem('pageNumber')
    ? Number(localStorage.getItem('pageNumber'))
    : 1
  const [pageNumber, setPageNumber] = useState<number>(localPageNumber)
  const localPageCount = localStorage.getItem('pageCount')
    ? Number(localStorage.getItem('pageCount'))
    : 1
  const [pageCount, setPageCount] = useState<number>(localPageCount)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (search) {
      setSearch(search)
      fetchSearchCharacters()
      setIsLoaded(true)
    } else {
      fetchGetCharacters(pageNumber)
      setIsLoaded(true)
    }
  }, [])

  async function fetchGetCharacters(pageNumber: number) {
    await getCharacters({ page: pageNumber }).then((response) => {
      if (!response.data.results) return

      setCharacters(response.data.results.sort(compare))

      if (!response.data.info) return

      setPageCount(response.data.info.pages)
      localStorage.setItem('pageCount', response.data.info.pages.toString())
    })
  }

  async function fetchSearchCharacters() {
    await getCharacters({ name: search.trim() }).then((response) => {
      if (!response.data.results) return

      setCharacters(
        response.data.results
          .filter((character) => {
            if (character.name.startsWith(search.trim())) return character
            return false
          })
          .sort(compare)
      )
    })
  }

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return

    fetchSearchCharacters()
  }

  const searchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    localStorage.setItem('search', event.target.value)
  }

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber)
    localStorage.setItem('pageNumber', pageNumber.toString())
    fetchGetCharacters(pageNumber)
  }

  function renderCharacterCards() {
    if (characters) {
      return Object.keys(characters).map((key) => {
        return (
          <CharactersCard
            key={characters[key].id}
            id={characters[key].id}
            name={characters[key].name}
            species={characters[key].species}
            image={characters[key].image}
          />
        )
      })
    }
  }

  return (
    <div className={classes.characters}>
      <Login />
      <div className={classes.charactersImage}>
        <img
          src={RickMorty}
          alt='Rick & Morty'
        />
      </div>
      <div className={classes.charactersSearch}>
        <svg
          className={classes.charactersSearchIcon}
          width='18'
          height='18'
          viewBox='0 0 18 18'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z'
            fill='black'
            fillOpacity='0.54'
          />
        </svg>

        <input
          className={classes.charactersSearchInput}
          type='text'
          placeholder='Filter by name...'
          onChange={(event) => searchOnChange(event)}
          onKeyDown={(event) => handleSearch(event)}
          value={search}
        />
      </div>
      {isLoaded && (
        <div className={classes.charactersList}>{renderCharacterCards()}</div>
      )}
      {!search && (
        <PageControls
          pageNumber={pageNumber}
          pageCount={pageCount}
          onClick={(pageNumber: number) => handlePageChange(pageNumber)}
        />
      )}
    </div>
  )
}
