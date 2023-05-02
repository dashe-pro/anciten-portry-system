import React, { FC } from 'react'
import { NavBar, TabBar } from 'antd-mobile'
import './app-tabbar.scss'
import {
  Route,
  useNavigate,
  useLocation,
  MemoryRouter as Router,
} from 'react-router-dom'

const Apptabbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const setRouteActive = (value: string) => {
    navigate(value)
  }

  const tabs = [
    {
      key: '/poetry',
      title: '诗词',
    },
    {
      key: '/recitepoetry',
      title: '背诵',
    },
    {
      key: '/tea',
      title: '集会',
    },

    {
      key: '/my',
      title: '我的',
    },
  ]

  return (
    <TabBar
      className="fixed-bottom"
      activeKey={pathname}
      onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} title={item.title} />
      ))}
    </TabBar>
  )
}
export default Apptabbar
