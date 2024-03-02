import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import React from 'react'
export const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  return (
    <div className=" flex  justify-center p-24 bg-[#2596be] h-screen ">
      <div className="flex flex-col  justify-between h-fit bg-white rounded-md p-6">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-4xl">Sign Up</h2>
          <span className="text-center text-slate-600">
            Enter your information <br /> to create account
          </span>
        </div>

        <div className="m-2 flex flex-col gap-4 ">
          <div className="flex flex-col gap-2 ">
            <span>First Name</span>
            <input
              className=" border border-slate-800 rounded-md px-2 mr-2"
              type="text"
              placeholder="Durgesh"
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            ></input>
          </div>
          <div className="flex flex-col gap-2 ">
            <span>Last Name</span>
            <input
              className=" border border-slate-800 rounded-md px-2 mr-2"
              type="text"
              placeholder="Chandrakar"
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            ></input>
          </div>
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
              placeholder=""
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
                'http://localhost:3000/api/v1/user/signup',
                {
                  method: 'POST',
                  body: JSON.stringify({
                    username: userName,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              )
              const data = await response.json()

              if (data.msg === 'User Created Succesfully') {
                localStorage.setItem('token', data.token)
                localStorage.setItem('name', data.name)
                navigate('/dashboard')
              } else {
                alert('Invalid inputs / email already taken')
              }

              console.log(data)
            }}
            className=" bg-black text-white w-full px-2  py-0.5 mt-2 rounded-md"
          >
            Sign Up
          </button>
          <div className="flex">
            <span> Already have an account ?</span>
            <span className="pl-2 underline">
              {' '}
              <Link to={'/signin'}>login </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
