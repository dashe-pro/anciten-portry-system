import React from 'react'
import { useNavigate } from 'react-router-dom'
import Apptabbar from '../../components/app-tabbar.tsx'
import { NavBar, Card, Button } from 'antd-mobile'
import { RightOutline } from 'antd-mobile-icons'
import './index.scss'
const RecitePoetry = () => {
  const navigate = useNavigate()
  const handldmyplan = () => {
    navigate('/myplan')
  }
  return (
    <div>
      <NavBar back={null}>今日背诗词</NavBar>
      <Card
        title={<div style={{ fontWeight: 'normal' }}>大家都在学</div>}
        extra={
          <div>
            <span>更多</span>
            <RightOutline />
          </div>
        }></Card>
      <div className="bottom-buttom" onClick={handldmyplan}>
        <Button block color="primary">
          我的背诗计划
        </Button>
      </div>

      <Apptabbar />
    </div>
  )
}
export default RecitePoetry
