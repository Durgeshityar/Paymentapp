import React from 'react'
import { Users } from './Users'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('')
  const [balance, setBalance] = useState('')
  const location = useLocation()
  const name = location.state?.name
  console.log(name)

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/user/bulk?filter=' + filter)
      .then((res) => {
        setUsers(res.data.users)
      })
  }, [filter])

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/account/balance', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((r) => {
        setBalance(r.data.balance)
      })
      .catch((error) => {
        console.error('Error fetching balance:', error)

        setBalance('Error fetching balance')
      })
  }, [])

  return (
    <div className=" bg-[#2596be] h-dvh flex items-center">
      <div className="p-4 mx-4 bg-white w-full h-fit rounded ">
        <div className="flex justify-between items-center shadow-sm p-3 bg-white">
          <span className="text-2xl font-semibold"> Payments App</span>
          <span className="text-xl font-semibold">
            Hello , {localStorage.name}
          </span>
        </div>
        <div className=" text-xl font-semibold p-3">
          Your Balance ₹ {balance}
        </div>
        <div className="p-3">
          <div className="text-xl font-semibold">Users</div>
          <input
            className="outline-none border border-gray-300 rounded-md w-full  mt-3 "
            type=" text"
            placeholder="Search Users"
            onChange={(e) => {
              setFilter(e.target.value)
            }}
          ></input>
        </div>
        <div className="p-3 flex flex-col gap-2">
          {users.map((u, index) => {
            return (
              <div key={index}>
                <Users user={u} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
