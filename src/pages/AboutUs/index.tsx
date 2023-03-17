import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, Dialog, Toast, Form, Input } from 'antd-mobile'

const AboutUs = () => {
  const navigate = useNavigate()

  // const back = () => {
  //   navigate('/my')
  // }

  return (
    <div>
      <NavBar onBack={() => navigate('/my')}>关于我们</NavBar>
    </div>
  )
}
export default AboutUs
