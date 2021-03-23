import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile(props: any) {
  const user = props.user

  return (
    <Link to={`/profile/${ user.username }`} className="flex p-4 bg-white rounded">
      <img className="w-20 h-20 rounded" src={ user.photoUrl } alt={user.displayName} />
      <div className="flex flex-col ml-4">
        <div className="text-xl">{ user.displayName }</div>
        <img className="w-6 h-6 mt-2" src={ user.favProgLang + '.svg' } alt="programming language" />
      </div>
    </Link> 
  )
}
