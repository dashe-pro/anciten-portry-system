import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, Dialog, Toast, Form, Input } from 'antd-mobile'
import '../../components/nav.scss'
import './index.scss'
const AboutUs = () => {
  const navigate = useNavigate()
  return (
    <div>
      <NavBar className="nav" onBack={() => navigate('/my')}>
        关于我们
      </NavBar>
      <div className="content-about">
        2023年浙大城市学院本科计算机专业毕业设计古诗词鉴赏管理信息系统的前端项目，以下是这个项目的gitee地址：
        <a>
          https://gitee.com/zhong-gaoyun/ancient-poetry-appreciation-system---react
        </a>
      </div>
    </div>
  )
}
export default AboutUs
