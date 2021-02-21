import React, { useEffect, useState } from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import userStore from '../store/User'

export default function Register() {
  const userCode = new URLSearchParams(useLocation().search).get('code')
  const { user, setUser } = userStore()
  const [name, setName] = useState('')
  const [lang, setLang] = useState('')

  useEffect(() => {
    if (Cookies.get('token')) {
      axios.get('http://localhost:8000/user', {
        headers: {
          Authorization: Cookies.get('token')
        }
      }).then((res) => {
        setUser(res.data)
        setName(res.data.displayName)
        setLang(res.data.favProgLang)
        return res
      }).catch((err) => {
        console.log(err)
        return null
      })
    }
  }, [setUser])

  const completeRegister = () => {
    user.displayName = name
    user.favProgLang = lang

    setUser(user)

    axios.put('http://localhost:8000/user', user, {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((res) => {
      setUser(res.data.user)
    }).catch((err) => {
      console.log(err)
    })
  }
  
  if (userCode) {
    if (Cookies.get('token')) {
      if (user.createdAt.toString() !== user.updatedAt.toString()) {
        return <Redirect to='/' />
      }

      return <Redirect to='/register' />
    } else {
      Cookies.set('token', userCode, { expires: 1 })
      return <Redirect to='/register' />
    }
  } else {
    if (!Cookies.get('token')) {
      return <Redirect to='/' />
    }

    if (user.createdAt.toString() !== user.updatedAt.toString()) {
      return <Redirect to='/' />
    }

    return (
      <div className="my-4 inline-flex flex-col">
        <h1 className="text-2xl font-bold mb-2">Create your account</h1>
  
        <div className="inline-flex flex-col my-2">
          <label className="mb-2">Display Name</label>
          <input className="px-2 py-1 border border-gray-200" value={name} onChange={(e: any) => setName(e.target.value)} />
        </div>
  
        <div className="inline-flex flex-col my-2">
          <label className="mb-2">Favourite Programming Language</label>
          <select className="px-2 py-1 border border-gray-200" value={lang} onChange={(e: any) => setLang(e.target.value)}>
            <option value="html" disabled>HTML</option>
            <option value="js">Javascript</option>
            <option value="php">PHP</option>
            <option value="java">Java</option>
            <option value="dart">Dart</option>
            <option value="c">C</option>
            <option value="cSharp">C#</option>
            <option value="cPlusPlus">C++</option>
            <option value="ruby">Ruby</option>
            <option value="go">Go</option>
            <option value="python">Python</option>
            <option value="haskell">Haskell</option>
          </select>
        </div>
  
        <button className="inline-block w-max mt-2 py-2 px-4 text-white bg-blue-600 hover:opacity-80" onClick={() => completeRegister()}>Complete</button>
      </div>
    )
  }
}
