import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, Dialog, Toast, Form, Input } from 'antd-mobile'
import '../../components/nav.scss'
const AboutUs = () => {
  const navigate = useNavigate()
  return (
    <div>
      <NavBar className="nav" onBack={() => navigate('/my')}>
        关于我们
      </NavBar>
    </div>
  )
}
export default AboutUs
