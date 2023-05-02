import React, { useState } from 'react'
import Apptabbar from '../../components/app-tabbar.tsx'

import { Col, Row, Tabs, Input } from 'antd'
import { AddCircleOutline } from 'antd-mobile-icons'

import { useNavigate } from 'react-router-dom'
import './index.scss'
import My from './components/my.tsx'
import Dynamic from './components/dynamic.tsx'
import Library from './components/library.tsx'

const Tea = () => {
  const [key, setKey] = useState(1)
  const navigate = useNavigate()
  const handldAddDynamic = () => {
    // history.push(`/poetrydetail?id=${id}`)
    navigate('/adddynamic')
  }
  const operations = (
    <div onClick={handldAddDynamic} style={{ fontSize: 24 }}>
      <AddCircleOutline />
    </div>
  )
  const onChange = (key) => {
    setKey(key)
  }
  const items = [
    {
      key: '1',
      label: `文库`,
      children: <Library />,
    },
    {
      key: '2',
      label: `动态`,
      children: <Dynamic />,
    },

    {
      key: '3',
      label: `我的`,
      children: <My />,
    },
  ]
  return (
    <div>
      <Tabs
        className="tabs1"
        tabBarStyle={{ position: 'fixed', top: '0' }}
        defaultActiveKey="1"
        items={items}
        tabBarExtraContent={operations}
        onChange={onChange}
      />

      <Apptabbar />
    </div>
  )
}
export default Tea
