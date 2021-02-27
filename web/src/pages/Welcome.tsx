import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import userStore from '../store/User'
import Cookies from 'js-cookie'
import axios from 'axios'

import apiRoute from '../api'

export default function Home() {
  const { user, setUser } = userStore()
  const userCode = new URLSearchParams(useLocation().search).get('code')

  if (Cookies.get('token') && user._id === '') {
    axios.get(apiRoute() + 'user', {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((res) => {
      if (res.data.user !== null) {
        setUser(res.data.user)
      }
      return res
    }).catch((err) => {
      console.log(err)
      return null
    })
  } else if (user._id !== '') {
    return <Redirect to="/home" />
  } else if (!Cookies.get('token') && userCode) {
    Cookies.set('token', userCode, { expires: 30 })
    return <Redirect to="/home" />
  }

  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold mb-2">Codemate</h1>
      <p className="text-lg">Meet with new people who likes your favorite programming language.</p>
      <a className="inline-block mt-4 px-3 py-2 text-lg bg-black text-white hover:opacity-80" href="https://github.com/login/oauth/authorize?client_id=874c8b8f25b7277b9b30&redirect_uri=http://localhost:8000/auth/github/callback/web">Login with Github</a>
    </div>
  )
}
