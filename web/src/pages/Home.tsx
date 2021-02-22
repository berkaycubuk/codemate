import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import userStore from '../store/User'
import axios from 'axios'
import Cookies from 'js-cookie'
import { User } from '../types'

export default function Home() {
  const { user } = userStore()
  const [people, setPeople] = useState([])

  useEffect(() => {
    getPeople()
  }, [])

  if (user._id === '') {
    return <Redirect to="/" />
  }

  const getPeople = () => {
    axios.get('https://codemate-api.herokuapp.com/people', {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((res) => {
      setPeople(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="my-4">
      <div className="my-2 bg-blue-100 p-4">
        <h2 className="text-xl font-bold mb-2">Codemate in development!</h2>
        <p>Thank you for joining Codemate! We're currently waiting for people to join. Don't forget to tell your friends!</p>
      </div>

      <h1 className="text-2xl font-bold mb-2">Home</h1>
      <p className="text-lg">Meet with new people who likes your favourite programming language.</p>

      <div className="flex flex-wrap my-4">
        { people.map((user: User, key) => (
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4" key={key}>
            <Link to={`/profile/${ user.username }`} className="flex p-4 bg-gray-100">
              <img className="w-20 h-20" src={ user.photoUrl } alt={user.displayName} />
              <div className="flex flex-col ml-4">
                <div className="text-xl">{ user.displayName }</div>
                <img className="w-6 h-6 mt-2" src="http://localhost:3000/{ user.favProgLang }.svg" alt="programming language" />
              </div>
            </Link> 
          </div>
        )) }
      </div>
    </div>
  )
}
