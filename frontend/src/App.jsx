import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './Component/Signup'
import { Signin } from './Component/Signin'
import { Dashboard } from './Component/Dashboard'
import { SendMoney } from './Component/SendMoney'

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/send" element={<SendMoney />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
