import React from 'react'
import classes from './Auth.module.scss'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'

export const Auth: React.FC = () => {
  const navigate = useNavigate()

  /* Sign in with Google */
  const googleProvider = new GoogleAuthProvider()
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      navigate('/')
    } catch (error) {}
  }

  /* Sign in with Facebook */
  const facebookProvider = new FacebookAuthProvider()
  const facebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider)
      const credantial = await FacebookAuthProvider.credentialFromResult(result)
      const token = credantial?.accessToken
      const photoURL = result.user.photoURL + '?height=48&access_token=' + token
      if (auth.currentUser)
        await updateProfile(auth.currentUser, { photoURL: photoURL })
      navigate('/')
    } catch (error) {}
  }

  const facebookIconClasses = [
    classes.authButtonIcon,
    classes['authButtonIcon--fb'],
  ]

  return (
    <div className={classes.auth}>
      <h2 className={classes.authHeading}>Welcome to Rick & Morty</h2>
      <button
        className={classes.authButton}
        onClick={googleLogin}
      >
        <FcGoogle className={classes.authButtonIcon} />
        Continue with Google
      </button>
      <button
        className={classes.authButton}
        onClick={facebookLogin}
      >
        <FaFacebook className={facebookIconClasses.join(' ')} />
        Continue with Facebook
      </button>
    </div>
  )
}
