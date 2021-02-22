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

  const sendConnectionRequest = () => {
    axios.post('https://codemate-api.herokuapp.com/connection', {
      person: userState._id
    }, {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((res) => {
      
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="my-4">
      { username ? (
        <>
          <h1 className="text-2xl font-bold mb-2">Profile</h1>
          <img className="w-40 h-40 my-4" src={ userState.photoUrl } alt={ userState.displayName} />
          <div className="text-xl my-2">{ userState.displayName }</div>
          <p className="my-4 whitespace-pre-line">{ userState.bio }</p>
          <button className="inline-block px-4 py-2 my-2 text-white bg-blue-600 hover:opacity-80" onClick={() => sendConnectionRequest()}>Send Connection Request</button>
          <img className="w-6 h-6" src={ process.env.PUBLIC_URL + '/' + userState.favProgLang + '.svg' } alt="programming language" />
          <a className="text-blue-600 hover:underline" rel="noreferrer" href={ userState.blog } target="_blank">{ userState.blog }</a>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2">Profile <Link to="/settings" className="ml-4 text-base font-normal text-blue-600 hover:underline">Edit profile</Link></h1>
          <img className="w-40 h-40 my-4" src={user.photoUrl} alt={ user.displayName } />
          <div className="text-xl my-2">{user.displayName}</div>
          <p className="my-4 whitespace-pre-line">{user.bio}</p>
          <img className="w-6 h-6" src={ process.env.PUBLIC_URL + '/' + user.favProgLang + '.svg' } alt="programming language" />
          <a className="text-blue-600 hover:underline" rel="noreferrer" href={user.blog} target="_blank">{user.blog}</a>
        </>
      ) }
    </div>
  )
}
