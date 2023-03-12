import React, { useEffect, useState } from 'react'
import classes from './PageControls.module.scss'
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md'

interface Props {
  pageNumber: number
  pageCount: number
  onClick: any
}

export const PageControls: React.FC<Props> = (props) => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    return () =>
      window.removeEventListener('resize', () => setWidth(window.innerWidth))
  }, [])

  const pageNumbers: number[] = []

  if (width >= 784) {
    for (let i = 0; i < 5; i++) {
      props.pageNumber + i <= props.pageCount
        ? pageNumbers.push(props.pageNumber + i)
        : pageNumbers.push(props.pageCount - i)
    }
  } else {
    pageNumbers.push(props.pageNumber)
  }

  function renderButtons() {
    return pageNumbers
      .sort((a, b) => {
        if (a < b) return -1
        if (a > b) return 1
        return 0
      })
      .map((pageNumber, index) => {
        const buttonClasses = [
          classes.pageControlsButton,
          props.pageNumber === pageNumber ? classes.active : '',
        ]

        return (
          <button
            key={index}
            className={buttonClasses.join(' ')}
            onClick={() => props.onClick(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }

  return (
    <div className={classes.pageControls}>
      <button
        className={classes.pageControlsButton}
        onClick={() => props.onClick(1)}
      >
        <MdKeyboardDoubleArrowLeft className={classes.pageControlsButtonIcon} />
      </button>
      <button
        className={classes.pageControlsButton}
        onClick={
          props.pageNumber > 1
            ? () => props.onClick(props.pageNumber - 1)
            : () => {}
        }
      >
        <MdKeyboardArrowLeft className={classes.pageControlsButtonIcon} />
      </button>
      <>{renderButtons()}</>
      <button
        className={classes.pageControlsButton}
        onClick={
          props.pageNumber < props.pageCount
            ? () => props.onClick(props.pageNumber + 1)
            : () => {}
        }
      >
        <MdKeyboardArrowRight className={classes.pageControlsButtonIcon} />
      </button>
      <button
        className={classes.pageControlsButton}
        onClick={() => props.onClick(props.pageCount)}
      >
        <MdKeyboardDoubleArrowRight
          className={classes.pageControlsButtonIcon}
        />
      </button>
    </div>
  )
}
