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
      <a className="inline-block mt-4 px-3 py-2 text-lg bg-black text-white hover:opacity-80" href="https://github.com/login/oauth/authorize?client_id=874c8b8f25b7277b9b30&redirect_uri=https://codemate-api.herokuapp.com/auth/github/callback/web">Login with Github</a>
      <br/>
      <a className="inline-block mt-4" href="https://www.producthunt.com/posts/codemate?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-codemate" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=285928&theme=light" alt="Codemate - Connect with other developers | Product Hunt" style={{ width: '250px', height: '54px'}} width="250" height="54" /></a>
      <br/>
      <a className="text-blue-600 hover:underline" href="https://marketplace.visualstudio.com/items?itemName=berkaycubuk.codemate" rel="noreferrer" target="_blank">Get VsCode extension!</a>
    </div>
  )
}
