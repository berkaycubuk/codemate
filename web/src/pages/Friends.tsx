import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import userStore from '../store/User'
import axios from 'axios'
import Cookies from 'js-cookie'

import apiRoute from '../api'

export default function Friend() {
  const { user } = userStore()
  const [friends, setFriends] = useState([])
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    getFriends()
  }, [])

  if (user._id === '') {
    return <Redirect to="/" />
  }

  const getFriends = () => {
    if (fetched) return
    axios.get(apiRoute() + 'connection/all', {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((res) => {
      setFriends(res.data.users)
      setFetched(true)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold mb-2">Friends</h1>

      <div className="flex flex-wrap my-4">
        { friends.map((user: any, key) => (
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4" key={key}>
            <Link to={`/profile/${ user.username }`} className="flex p-4 bg-gray-100">
              <img className="w-20 h-20" src={ user.photoUrl } alt={user.displayName} />
              <div className="flex flex-col ml-4">
                <div className="text-xl">{ user.displayName }</div>
                <img className="w-6 h-6 mt-2" src={ user.favProgLang + '.svg' } alt="programming language" />
              </div>
            </Link> 
          </div>
        )) }
        { !fetched ? (<div>Loading...</div>) : (<></>) }
      </div>
    </div>
  )
}
