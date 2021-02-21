import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import userStore from '../store/User'

export default function Settings() {
  const { user, setUser } = userStore()
  const [name, setName] = useState(user.displayName)
  const [lang, setLang] = useState(user.favProgLang)
  const [bio, setBio] = useState(user.bio)
  const [location, setLocation] = useState(user.location)
  const [blog, setBlog] = useState(user.blog)

  if (user._id === '') {
    return <Redirect to="/" />
  }

  const saveSettings = () => {
    user.displayName = name
    user.favProgLang = lang
    user.bio = bio
    user.location = location
    user.blog = blog

    axios.put('http://localhost:8000/user', user, {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((res) => {
      setUser(res.data.user)
      alert('Saved!')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="my-4 inline-flex flex-col">
      <h1 className="text-2xl font-bold mb-2">Settings <Link to="/profile" className="ml-4 text-base font-normal text-blue-600 hover:underline">go to profile</Link></h1>
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

      <div className="inline-flex flex-col my-2">
        <label className="mb-2">Bio</label>
        <textarea className="px-2 py-1 border border-gray-200" defaultValue={bio} onChange={(e: any) => setBio(e.target.value)}></textarea>
      </div>

      <div className="inline-flex flex-col my-2">
        <label className="mb-2">Location</label>
        <input className="px-2 py-1 border border-gray-200" value={location} onChange={(e: any) => setLocation(e.target.value)} />
      </div>

      <div className="inline-flex flex-col my-2">
        <label className="mb-2">Website</label>
        <input className="px-2 py-1 border border-gray-200" value={blog} onChange={(e: any) => setBlog(e.target.value)} />
      </div>

      <button className="inline-block w-max mt-2 py-2 px-4 text-white bg-blue-600 hover:opacity-80" onClick={() => saveSettings()}>Save</button>
    </div>
  )
}
