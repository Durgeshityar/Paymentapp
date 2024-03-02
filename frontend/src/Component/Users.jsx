import { useNavigate } from 'react-router-dom'
import React from 'react'
export const Users = ({ user }) => {
  const navigate = useNavigate()

  const handleSendMoney = () => {
    navigate('/send', { state: { username: user.firstName, userId: user._id } })
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="font-semibold">{user.firstName}</span>
        <button
          onClick={handleSendMoney}
          className="text-white bg-black px-2 py-1 rounded"
        >
          Send Money
        </button>
      </div>
    </div>
  )
}
