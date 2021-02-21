import React from 'react'

export default function Register() {
  return (
    <div className="my-4 inline-flex flex-col">
      <h1 className="text-2xl font-bold mb-2">Create your account</h1>

      <div className="inline-flex flex-col my-2">
        <label className="mb-2">Username</label>
        <input className="px-2 py-1 border border-gray-200" placeholder="berkaycubuk" />
      </div>

      <div className="inline-flex flex-col my-2">
        <label className="mb-2">Display Name</label>
        <input className="px-2 py-1 border border-gray-200" placeholder="berkaycubuk" />
      </div>

      <button className="inline-block w-max mt-2 py-2 px-4 text-white bg-blue-600 hover:bg-blue-500">Complete</button>
    </div>
  )
}
