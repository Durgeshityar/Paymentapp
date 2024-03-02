import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const Signin = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  return (
    <div className=" flex  justify-center p-24 bg-[#2596be] h-screen ">
      <div className="flex flex-col  justify-between h-4/6 bg-white rounded-md p-6">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-4xl">Sign In</h2>
          <p className="text-center text-slate-600">
            Enter your credentials to <br /> access your account
          </p>
        </div>

        <div className="m-2 flex flex-col gap-4 ">
          <div className="flex flex-col gap-2 ">
            <span>Email</span>
            <input
              className=" border border-slate-800 rounded-md px-2 mr-2"
              type="text"
              placeholder="durgesh@example.com"
              onChange={(e) => {
                setUserName(e.target.value)
              }}
            ></input>
          </div>
          <div className="flex flex-col gap-2 ">
            <span>Password</span>
            <input
              className=" border border-slate-800 rounded-md px-2 mr-2"
              type="text"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            ></input>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            onClick={async () => {
              const response = await fetch(
                'http://localhost:3000/api/v1/user/signin',
                {
                  method: 'POST',
                  body: JSON.stringify({
                    username: username,
                    password: password,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              )
              const data = await response.json()

              if (data.msg === 'success') {
                localStorage.setItem('token', data.token)
                localStorage.setItem('name', data.name)

                console.log(data.name)

                navigate('/dashboard')
              } else {
                alert(data.msg)
              }
            }}
            className=" bg-black text-white w-full px-2  py-0.5  rounded-md"
          >
            Sign In
          </button>
          <div className="flex">
            <span> Don,t have an account ?</span>
            <span className="pl-2  underline">
              {' '}
              <Link to={'/signup'}>signup</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
