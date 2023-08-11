import React from 'react'
import {auth, provider} from '../firebase';
import { signInWithRedirect } from 'firebase/auth';

const signIn = () => {
  signInWithRedirect(auth, provider);
}

function SignRules() {
  return (
    <div>
      <h1>Sign in Page</h1>
      <button onClick={() => signIn()}>
        Sign in 
      </button>
    </div>
  )
}

export default SignRules