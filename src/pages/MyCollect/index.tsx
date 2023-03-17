import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, Dialog, Toast, Form, Input } from 'antd-mobile'

const Mycollect = () => {
  const navigate = useNavigate()

  // const back = () => {
  //   navigate('/my')
  // }

  return (
    <div>
      <NavBar onBack={() => navigate('/my')}>我的收藏</NavBar>
    </div>
  )
}
export default Mycollect
