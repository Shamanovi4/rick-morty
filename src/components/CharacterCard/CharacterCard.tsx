import React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './CharacterCard.module.scss'

interface Props {
  id: string
  name: string
  species: string
  image: string
}

export const CharactersCard: React.FC<Props> = (props) => {
  const navigate = useNavigate()

  return (
    <div
      className={classes.card}
      onClick={() =>
        navigate(`character/${props.name.toLowerCase().replace(/\s+/g, '')}`, {
          state: { id: props.id },
        })
      }
    >
      <div className={classes.cardImage}>
        <img
          src={props.image}
          alt=''
        />
      </div>
      <h2 className={classes.cardName}>{props.name}</h2>
      <p className={classes.cardSpecies}>{props.species}</p>
    </div>
  )
}
