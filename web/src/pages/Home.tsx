import React from 'react'
import { Redirect } from 'react-router-dom'
import userStore from '../store/User'

export default function Home() {
  const { user } = userStore()

  if (user._id === '') {
    return <Redirect to="/" />
  }

  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold mb-2">Home</h1>
      <p className="text-lg">Meet with new people who likes your favourite programming language.</p>
    </div>
  )
}
