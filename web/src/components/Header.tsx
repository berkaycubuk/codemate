import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import userStore from '../store/User'

export default function Header() {
  const { user, clearUser } = userStore()
  const logout = () => {
    clearUser()
    Cookies.remove('token')
  }

  return (
    <header className="flex items-center p-8 bg-gray-100">
      <Link to="/" className="text-xl font-semibold">Codemate</Link>
      <nav className="ml-4">
        { user._id !== '' ? (
          <>
            <Link to="/friends" className="ml-3 text-blue-600 hover:underline">Friends</Link>
            <Link to="/profile" className="ml-3 text-blue-600 hover:underline">Profile</Link>
            <Link to="/" className="ml-3 text-blue-600 hover:underline" onClick={() => logout()}>Logout</Link>
          </>
        ) : (
          <></>
        ) }
      </nav>
    </header>
  )
}
