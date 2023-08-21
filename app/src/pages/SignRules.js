import React from 'react'
import {auth, provider} from '../firebase';
import { signInWithRedirect } from 'firebase/auth';
import "./css/signIn.css"

const signIn = () => {
  signInWithRedirect(auth, provider);
}

function SignRules() {
  return (
    <div className='body'>
      <div className='NavBar'> </div>
      <div className='PageContent'>
        <h1>Sign in Page</h1>
        <button onClick={() => signIn()}>
          Sign in 
        </button>
      </div>
    </div>
  )
}

export default SignRules