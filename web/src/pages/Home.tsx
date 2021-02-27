import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import userStore from '../store/User'
import axios from 'axios'
import Cookies from 'js-cookie'
import { User } from '../types'

import apiRoute from '../api'

export default function Home() {
  const { user } = userStore()
  const [people, setPeople] = useState([])
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    getPeople()
  }, [])

  if (user._id === '') {
    return <Redirect to="/" />
  }

  const getPeople = () => {
    if (fetched) return
    axios.get(apiRoute() + 'people', {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((res) => {
      setPeople(res.data.users)
      setFetched(true)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="my-4">
      <div className="my-2 bg-blue-100 p-4">
        <h2 className="text-xl font-bold mb-2">Welcome to Codemate!</h2>
        <p>Thank you for joining Codemate! Don't forget to tell your friends about us!</p>
      </div>

      <h1 className="text-2xl font-bold mb-2">Home</h1>
      <p className="text-lg">Meet with new people who likes your favorite programming language.</p>

      <div className="flex flex-wrap my-4">
        { people.map((user: User, key) => (
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
