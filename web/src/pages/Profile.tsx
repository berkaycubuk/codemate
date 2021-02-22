import React, { useState, useEffect } from 'react'
import { Redirect, Link, useParams } from 'react-router-dom'
import userStore from '../store/User'
import axios from 'axios'
import Cookies from 'js-cookie'
import apiRoute from '../api'

export default function Profile() {
  const { username }: any = useParams()
  const { user } = userStore()
  const [userState, setUserState]: any = useState({})
  const [connectionState, setConnectionState] = useState('')
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    if (username && !fetched) {
      axios.get(apiRoute() + 'user/' + username, {
        headers: {
          Authorization: Cookies.get('token')
        }
      }).then((res) => {
        setUserState(res.data)
        setFetched(true)
        getConnectionStatus(res.data._id)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [])

  if (user._id === '') {
    return <Redirect to="/" />
  }

  const getConnectionStatus = async (personId: any) => {
    await axios.post(apiRoute() + 'connection/status', {
      person: personId
    }, {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((res) => {
      if (res.data.status !== null) {
        setConnectionState(res.data.status)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  const sendConnectionRequest = () => {
    axios.post(apiRoute() + 'connection', {
      person: userState._id
    }, {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((res) => {
      getConnectionStatus(userState._id)
    }).catch((err) => {
      console.log(err)
    })
  }

  const acceptConnectionRequest = () => {
    axios.put(apiRoute() + 'connection', {
      person: userState._id
    }, {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((res) => {
      getConnectionStatus(userState._id)
    }).catch((err) => {
      console.log(err)
    })
  }

  const deleteConnection = () => {
    axios.delete(apiRoute() + 'connection', {
      headers: {
        Authorization: Cookies.get('token')
      },
      data: {
        person: userState._id
      }
    }).then((res) => {
      getConnectionStatus(userState._id)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="my-4">
      { username ? (
        <>
          <h1 className="text-2xl font-bold mb-2">Profile</h1>
          <img className="w-40 h-40 my-4" src={ userState.photoUrl } alt={ userState.displayName} />
          <div className="text-xl my-2">{ userState.displayName }</div>
          <p className="my-4 whitespace-pre-line">{ userState.bio }</p>
          { connectionState === '' ? (
            <button className="inline-block px-4 py-2 my-2 text-white bg-blue-600 hover:opacity-80" onClick={() => sendConnectionRequest()}>Send Connection Request</button>
          ) : (
            <>
              { connectionState === 'pending' ? (
                <button className="inline-block px-4 py-2 my-2 text-white bg-blue-600 hover:opacity-80" onClick={() => acceptConnectionRequest()}>Accept Connection Request</button>
              ) : (
                <>
                  { connectionState === 'waiting' ? (
                    <button className="inline-block px-4 py-2 my-2 text-white bg-blue-600 hover:opacity-80">Waiting Response</button>
                  ) : (
                    <button className="inline-block px-4 py-2 my-2 text-white bg-blue-600 hover:opacity-80" onClick={() => deleteConnection()}>Delete Connection</button>
                  ) }
                </>
              ) }
            </>
          ) }
          <img className="w-6 h-6" src={ process.env.PUBLIC_URL + '/' + userState.favProgLang + '.svg' } alt="programming language" />
          <a className="text-blue-600 hover:underline" rel="noreferrer" href={ userState.blog } target="_blank">{ userState.blog }</a>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2">Profile <Link to="/settings" className="ml-4 text-base font-normal text-blue-600 hover:underline">Edit profile</Link></h1>
          <img className="w-40 h-40 my-4" src={user.photoUrl} alt={ user.displayName } />
          <div className="text-xl my-2">{user.displayName}</div>
          <p className="my-4 whitespace-pre-line">{user.bio}</p>
          <img className="w-6 h-6" src={ process.env.PUBLIC_URL + '/' + user.favProgLang + '.svg' } alt="programming language" />
          <a className="text-blue-600 hover:underline" rel="noreferrer" href={user.blog} target="_blank">{user.blog}</a>
        </>
      ) }
    </div>
  )
}
