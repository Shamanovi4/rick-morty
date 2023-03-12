import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getCharacter } from 'rickmortyapi'
import { Login } from '../Login/Login'
import classes from './Character.module.scss'

export const Character: React.FC = () => {
  const [character, setCharacter] = useState<any>({})
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const location = useLocation()

  useEffect(() => {
    async function fetchData() {
      const response = await getCharacter(location.state.id)
      setCharacter(response.data)
      setIsLoaded(true)
    }

    fetchData()
  }, [location.state.id])

  return (
    <>
      <Login />
      <Link
        to={'/'}
        className={classes.return}
      >
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z'
            fill='black'
          />
        </svg>
        <span className={classes.returnLabel}>GO BACK</span>
      </Link>
      {isLoaded && (
        <div className={classes.character}>
          <div className={classes.characterPortrait}>
            <img
              className={classes.characterPortraitImage}
              src={character.image}
              alt=''
            />
          </div>
          <h1 className={classes.characterName}>{character.name}</h1>
          <h2 className={classes.characterInfo}>Informations</h2>
          <ul className={classes.characterData}>
            <li className={classes.characterDataItem}>
              <h4 className={classes.characterDataItemHeading}>Gender</h4>
              <span className={classes.characterDataItemText}>
                {character.gender !== 'unknown' ? character.gender : 'Unknown'}
              </span>
            </li>
            <li className={classes.characterDataItem}>
              <h4 className={classes.characterDataItemHeading}>Status</h4>
              <span className={classes.characterDataItemText}>
                {character.status !== 'unknown' ? character.status : 'Unknown'}
              </span>
            </li>
            <li className={classes.characterDataItem}>
              <h4 className={classes.characterDataItemHeading}>Specie</h4>
              <span className={classes.characterDataItemText}>
                {character.species !== 'unknown'
                  ? character.species
                  : 'Unknown'}
              </span>
            </li>
            <li className={classes.characterDataItem}>
              <h4 className={classes.characterDataItemHeading}>Origin</h4>
              <span className={classes.characterDataItemText}>
                {character.origin.name !== 'unknown'
                  ? character.origin.name
                  : 'Unknown'}
              </span>
            </li>
            <li className={classes.characterDataItem}>
              <h4 className={classes.characterDataItemHeading}>Type</h4>
              <span className={classes.characterDataItemText}>
                {character.type && character.type !== 'unknown'
                  ? character.type
                  : 'Unknown'}
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
