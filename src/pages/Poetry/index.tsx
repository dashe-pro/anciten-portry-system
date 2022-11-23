import React, { useState } from 'react'
import Apptabbar from '../../components/app-tabbar.tsx'
import { NavBar, Space, Tabs, Popup } from 'antd-mobile'
import {
  SearchOutline,
  MoreOutline,
  CloseOutline,
  AppstoreOutline,
} from 'antd-mobile-icons'
import TopSwiper from './components/Swiper.tsx'
import moment from 'moment'

import ClassifyPopup from './components/ClassifyPopup.tsx'
import Poetryitem from '../../components/poetry-item.tsx'
const Poetry = () => {
  const [visible, setVisible] = useState(false)
  const poetry = [
    {
      id: 1,
      name: '春晓',
      author: '孟浩然',
      content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
      dynasty: '唐',
    },
    {
      id: 2,
      name: '春晓',
      author: '孟浩然',
      content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
      dynasty: '唐',
    },
    {
      id: 3,
      name: '春晓',
      author: '孟浩然',
      content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
      dynasty: '唐',
    },
    {
      id: 4,
      name: '春晓',
      author: '孟浩然',
      content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
      dynasty: '唐',
    },
    {
      id: 5,
      name: '春晓',
      author: '孟浩然',
      content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
      dynasty: '唐',
    },
    {
      id: 6,
      name: '春晓',
      author: '孟浩然',
      content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
      dynasty: '唐',
    },
    {
      id: 7,
      name: '春晓',
      author: '孟浩然',
      content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
      dynasty: '唐',
    },
    {
      id: 8,
      name: '春晓',
      author: '孟浩然',
      content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
      dynasty: '唐',
    },
    {
      id: 9,
      name: '春晓',
      author: '孟浩然',
      content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
      dynasty: '唐',
    },
    {
      id: 10,
      name: '春晓',
      author: '孟浩然',
      content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
      dynasty: '唐',
    },
    {
      id: 11,
      name: '春晓',
      author: '孟浩然',
      content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
      dynasty: '唐',
    },
  ]
  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <SearchOutline />
        <MoreOutline />
      </Space>
    </div>
  )
  const left = (
    <div
      onClick={() => {
        setVisible(true)
      }}
      style={{ fontSize: 24 }}>
      <AppstoreOutline />
    </div>
  )
  return (
    <div>
      <NavBar right={right} back={null} left={left}>
        诗词
      </NavBar>
      <div>
        <TopSwiper />
        <div>
          <div>{moment().format('YYYY-MM-DD')}</div>
          <div></div>
        </div>
        <div>
          <div>今日鉴诗</div>
          <div>
            {poetry.map((item) => {
              return <Poetryitem key={item.id} value={item} />
            })}
          </div>
        </div>
      </div>

      <Apptabbar />
      <ClassifyPopup visible={visible} setVisible={setVisible} />
    </div>
  )
}
export default Poetry
