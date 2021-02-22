import React from 'react'
import { Redirect } from 'react-router-dom'
import userStore from '../store/User'
import Cookies from 'js-cookie'
import axios from 'axios'

export default function Home() {
  const { user, setUser } = userStore()

  if (Cookies.get('token') && user._id === '') {
    axios.get('https://codemate-api.herokuapp.com/user', {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((res) => {
      setUser(res.data)
      return res
    }).catch((err) => {
      console.log(err)
      return null
    })
  } else if (user._id !== '') {
    return <Redirect to="/home" />
  }

  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold mb-2">Codemate</h1>
      <p className="text-lg">Meet with new people who likes your favourite programming language.</p>
      <a className="inline-block mt-4 px-3 py-2 text-lg bg-black text-white hover:opacity-80" href="https://github.com/login/oauth/authorize?client_id=874c8b8f25b7277b9b30">Login with Github</a>
    </div>
  )
}
