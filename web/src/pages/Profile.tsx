import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import userStore from '../store/User'

export default function Profile() {
  const { user } = userStore()

  if (user._id === '') {
    return <Redirect to="/" />
  }

  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold mb-2">Profile <Link to="/settings" className="ml-4 text-base font-normal text-blue-600 hover:underline">Edit profile</Link></h1>
      <img className="w-40 h-40 my-4" src={user.photoUrl} />
      <div className="text-xl my-2">{user.displayName}</div>
      <img className="w-6 h-6" src={'http://localhost:3000' + '/' + user.favProgLang + '.svg' } alt="programming language" />
      <p className="my-4 whitespace-pre-line">{user.bio}</p>
    </div>
  )
}
