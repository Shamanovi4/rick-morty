import React from 'react'
import classes from './Layout.module.scss'

interface Props {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = (props) => {
  return (
    <div className={classes.layout}>
      <main>{props.children}</main>
    </div>
  )
}
