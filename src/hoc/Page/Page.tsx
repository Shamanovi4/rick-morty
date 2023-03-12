import React from 'react'
import classes from './Page.module.scss'

interface Props {
  children: React.ReactNode
}

export const Page: React.FC<Props> = (props) => {
  return (
    <div className={classes.page}>
      <div className={classes.pageWrapper}>{props.children}</div>
    </div>
  )
}
