import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { AddOutline } from 'antd-mobile-icons'
const Myplan = () => {
  const navigate = useNavigate()

  const back = () => {
    navigate('/recitepoetry')
  }
  const right = (
    <div style={{ fontSize: 15 }}>
      <AddOutline /> 新建
    </div>
  )

  return (
    <div>
      <NavBar onBack={back} right={right}>
        我的背诗计划
      </NavBar>
    </div>
  )
}
export default Myplan
