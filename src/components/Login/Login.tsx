import React from 'react'
import classes from './Login.module.scss'
import { MdLogin } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import { signOut } from 'firebase/auth'

export const Login: React.FC = () => {
  const [user] = useAuthState(auth)

  return (
    <div className={classes.login}>
      {!user && (
        <Link
          to='/auth'
          className={classes.loginLink}
        >
          <span className={classes.loginLinkLabel}>LOGIN</span>
          <MdLogin className={classes.loginLinkIcon} />
        </Link>
      )}
      {user && user.photoURL && (
        <>
          <div className={classes.loginProfile}>
            <span className={classes.loginProfileName}>{user.displayName}</span>
            {/* <div className={classes.loginProfilePhoto}>
              <img
                src={user.photoURL}
                alt=''
              />
            </div> */}
            <img
              className={classes.loginProfilePhoto}
              src={user.photoURL}
              alt=''
            />
          </div>
          <div className={classes.loginLink}>
            <span
              className={classes.loginLinkLabel}
              onClick={() => signOut(auth)}
            >
              LOGOUT
            </span>
            <MdLogin className={classes.loginLinkIcon} />
          </div>
        </>
      )}
    </div>
  )
}
