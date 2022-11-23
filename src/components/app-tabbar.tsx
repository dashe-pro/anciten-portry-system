import React, { FC } from 'react'
import { NavBar, TabBar } from 'antd-mobile'
import './app-tabbar.scss'
import {
  Route,
  useNavigate,
  useLocation,
  MemoryRouter as Router,
} from 'react-router-dom'
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
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
      icon: <AppOutline />,
    },
    {
      key: '/tea',
      title: '茶社',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/recitepoetry',
      title: '背诗',
      icon: <MessageOutline />,
    },
    {
      key: '/my',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  return (
    <TabBar
      className="fixed-bottom"
      activeKey={pathname}
      onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}
export default Apptabbar
