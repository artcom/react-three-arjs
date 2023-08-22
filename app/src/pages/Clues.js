import React from 'react'
import {auth, db} from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

import markers from '../info.js';

function MarkerInfo(props) {
  return (
    <li key={props.marker.id}>
      <h3>{props.marker.name}</h3>
      <h2>{props.collected.includes(props.marker.id) ? 'Collected' : 'Not Collected'}</h2>
      <p>{props.marker.info}</p>
    </li>
  )
}

function Clues() {

  const [user, setUser] = useState(null);
  const [collected, setCollected] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        console.log("User signed in: ", newUser.displayName);
        setUser(newUser);
        onSnapshot(doc(db, "players", newUser.uid), (doc) => {
          if (doc.exists()) {
            setCollected(doc.data().collected);
          }
        });
      }else {
        console.log("User signed out");
      }
    });
  }, [user]);

  return (
    <div>
      <h1>Welcome to the Clues</h1>
      { user && <h2>Welcome, {user.displayName}</h2>}

      <p>Below are the clues to help you find the markers</p>
      <ul>
        {markers.map((marker) => {
          return (
            <MarkerInfo marker={marker} collected={collected} />
          )
        })}
      </ul>
    </div>
  )
}

export default Clues