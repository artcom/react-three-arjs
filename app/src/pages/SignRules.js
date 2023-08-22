import React from 'react'
import {auth, provider} from '../firebase';
import { signInWithRedirect, onAuthStateChanged } from 'firebase/auth';

const signIn = () => {
  signInWithRedirect(auth, provider);
}
const signOut = () => {
  auth.signOut();
}


function SignRules() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User signed in: ", user.displayName);
    }else {
      console.log("User signed out");
    }
  });

  return (
    <div>
      <h1>Sign in Page</h1>
      <button onClick={() => signIn()}>
        Sign in 
      </button>
      <button onClick={() => signOut()}>
        Sign out 
      </button>
    </div>
  )
}

export default SignRules