import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const SendMoney = () => {
  const location = useLocation()
  const username = location.state?.username // Optional chaining for safety
  const to = location.state?.userId
  const [visible, setVisible] = useState(false)
  const [msg, setMsg] = useState('')
  const first = username.charAt(0)

  const [balance, setBalance] = useState(0)

  return (
    <div className="flex items-center bg-slate-200  h-lvh ">
      <div className="p-5  flex flex-col justify-between  w-1/3 h-fit ml-72 bg-white shadow-md">
        <span className="text-center text-2xl font-semibold">Send Money</span>
        <div className="mt-10 flex flex-col gap-2">
          <div>
            <span className="text-lg text-center rounded-full p-1 mr-2 px-2 bg-green-500">
              {first}
            </span>
            <span className="text-xl">{username}</span>
          </div>
          <span> Amount (in Rs)</span>
          <input
            className="outline-none rounded pl-3 border border-gray-300"
            type="text"
            placeholder="Enter Amount"
            onChange={(e) => {
              setBalance(e.target.value)
            }}
          />
          <button
            className="bg-green-500 text-white rounded"
            onClick={() => {
              if (balance !== 0) {
                axios
                  .post(
                    'http://localhost:3000/api/v1/account/transfer',
                    {
                      to: to,
                      amount: balance,
                    },
                    {
                      headers: {
                        Authorization:
                          'Bearer ' + localStorage.getItem('token'),
                      },
                    }
                  )
                  .then((r) => {
                    if (r.data.message === 'Tramnsfer Successful') {
                      setVisible(true)
                      setMsg(r.data.message)
                    }
                  })
                  .catch((error) => {
                    console.error(error)
                  })
              }
            }}
          >
            Initiate Transfer
          </button>
          {visible ? (
            <div>
              {msg} <br /> Go back to{' '}
              <Link className="underline" to={'/dashboard'}>
                Dashboard
              </Link>
              ?
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
