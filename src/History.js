import React, { useEffect, useState } from 'react'

import firebase from './Firebase/firebase'

export default function History() {
  const [entries, setEntries] = useState()

  useEffect(() => {
    const ref = firebase.database().ref('/entries')
    ref.on('value', (snapshot) => {
      const state = snapshot.val()
      setEntries(state)
    })
  }, [])

  return (
    <div>
      <h1>History</h1>
      {JSON.stringify(entries, null, 2)}
    </div>
  )
}
