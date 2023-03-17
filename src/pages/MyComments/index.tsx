import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, Dialog, Toast, Form, Input } from 'antd-mobile'

const Mycomments = () => {
  const navigate = useNavigate()

  // const back = () => {
  //   navigate('/my')
  // }

  return (
    <div>
      <NavBar onBack={() => navigate('/my')}>我的评论</NavBar>
    </div>
  )
}
export default Mycomments
