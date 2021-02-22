import React, { useState, useEffect } from 'react'
import { Redirect, Link, useParams } from 'react-router-dom'
import userStore from '../store/User'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function Profile() {
  const { username }: any = useParams()
  const { user } = userStore()
  const [userState, setUserState]: any = useState({})
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    if (username && !fetched) {
      axios.get('https://codemate-api.herokuapp.com/user/' + username, {
        headers: {
          Authorization: Cookies.get('token')
        }
      }).then((res) => {
        setUserState(res.data)
        console.log(res.data)
        setFetched(true)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [])

  if (user._id === '') {
    return <Redirect to="/" />
  }

  return (
    <div className="my-4">
      { username ? (
        <>
          <h1 className="text-2xl font-bold mb-2">Profile</h1>
          <img className="w-40 h-40 my-4" src={ userState.photoUrl } alt={ userState.displayName} />
          <div className="text-xl my-2">{ userState.displayName }</div>
          <img className="w-6 h-6" src={ userState.favProgLang + '.svg' } alt="programming language" />
          <p className="my-4 whitespace-pre-line">{ userState.bio }</p>
          <a className="text-blue-600 hover:underline" rel="noreferrer" href={ userState.blog } target="_blank">{ userState.blog }</a>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2">Profile <Link to="/settings" className="ml-4 text-base font-normal text-blue-600 hover:underline">Edit profile</Link></h1>
          <img className="w-40 h-40 my-4" src={user.photoUrl} alt={ user.displayName } />
          <div className="text-xl my-2">{user.displayName}</div>
          <img className="w-6 h-6" src={ user.favProgLang + '.svg' } alt="programming language" />
          <p className="my-4 whitespace-pre-line">{user.bio}</p>
          <a className="text-blue-600 hover:underline" rel="noreferrer" href={user.blog} target="_blank">{user.blog}</a>
        </>
      ) }
    </div>
  )
}
