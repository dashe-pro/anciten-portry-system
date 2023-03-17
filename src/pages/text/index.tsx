import React from 'react'
import Apptabbar from '../../components/app-tabbar.tsx'
import { NavBar, Space, Tabs } from 'antd-mobile'
import { SearchOutline, MoreOutline, CloseOutline } from 'antd-mobile-icons'

const Tea = () => {
  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <SearchOutline />
        <MoreOutline />
      </Space>
    </div>
  )
  const left = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <SearchOutline />
        <MoreOutline />
      </Space>
    </div>
  )
  return (
    <div>
      <NavBar right={right} back={null} left={left}>
        茶舍
      </NavBar>
      <Tabs>
        <Tabs.Tab title="一盏" key="1">
          1
        </Tabs.Tab>
        <Tabs.Tab title="清茶" key="2">
          2
        </Tabs.Tab>
        <Tabs.Tab title="觅知音" key="3">
          3
        </Tabs.Tab>
      </Tabs>
      <Apptabbar />
    </div>
  )
}
export default Tea
