import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Apptabbar from '../../components/app-tabbar.tsx'
import { NavBar, Card } from 'antd-mobile'
import { Popup } from 'antd-mobile'
import { RightOutline } from 'antd-mobile-icons'
import './index.scss'
import '../../components/nav.scss'
import { Button, Progress } from 'antd'
import { http } from '../../utils'
import { RightOutlined } from '@ant-design/icons'
const RecitePoetry = () => {
  const [Popvisible, setPopVisible] = useState(false)
  const navigate = useNavigate()
  const handldRecitePoetry = () => {
    window.localStorage.setItem('time', Date.now())
    //计时
    navigate(
      `/myplan?id=${initpoetry.poetry.id}&authorid=${initpoetry.poetry.authorId}&nowcount=${initpoetry.nowCount}`
    )
  }
  const [initauthor, setInitAuthor] = useState([]) //初始化的诗人
  const getHotAuthor = async () => {
    const res = await http.get('/author/someAuthor')
    setInitAuthor(res.data.data.list)
  }

  const [inittime, setInitTime] = useState({}) //初始化的时间
  const getinitTime = async () => {
    const res = await http.get(
      `recite/dashboard?userId=${window.localStorage.getItem('id')}`
    )
    console.log(res)
    setInitTime(res.data.data.reciteDashboardDTO)
  }
  const [initpoetry, setInitPoetry] = useState({
    poetry: {
      id: null,
      title: '',
      author: '',
      content: '',
      dynasty: '',
      annotation: '',
      intro: '',
      translation: '',
    },
    totalCount: 0,
    nowCount: 0,
  }) //初始化的诗词
  const getinitPoetry = async () => {
    const params = {
      userId: window.localStorage.getItem('id'),
      authorId: '',
    }
    const res = await http.post('recite/count', params)
    console.log(res)
    setInitPoetry(res.data.data.reciteCount)
  }
  // const poetrycontent = initpoetry.poetry.content.split('。')

  useEffect(() => {
    //请求返回所以有的诗人
    getHotAuthor()
    getinitTime()
    getinitPoetry()
  }, [])
  const poetrycontent = initpoetry.poetry.content.split('。')
  const choseauthor = async (index) => {
    //选择诗人
    const params = {
      userId: window.localStorage.getItem('id'),
      authorId: index + 1,
    }
    const res = await http.post('recite/count', params)
    getinitPoetry()

    setInitPoetry(res.data.data.reciteCount)
    setPopVisible(false)
  }

  return (
    <div>
      <NavBar className="nav" back={null}>
        背诵
      </NavBar>
      <div className="top">
        <div className="top-top"> 当前在背：</div>
        <div className="poetry-content">
          <div className="title5">{initpoetry.poetry.title}</div>
          <div className="author">
            {'[' + initpoetry.poetry.dynasty + ']' + initpoetry.poetry.author}
          </div>
          {poetrycontent.map((item) => (
            <div className="content">{item}</div>
          ))}
        </div>

        <Button className="top-bottom" onClick={handldRecitePoetry}>
          开始背诗
        </Button>
      </div>
      <div className="mid">
        <div className="mid-top">
          <div>当前在背诗集：{initpoetry.poetry.author}诗集</div>
          <div
            onClick={() => {
              setPopVisible(true)
            }}>
            更换背诵诗集
            <RightOutline />
          </div>
        </div>
        <div className="mid-mid">
          <Progress
            percent={(
              (initpoetry.nowCount / initpoetry.totalCount) *
              100
            ).toFixed(2)}
            strokeColor="#753a32"
            trailColor="#f0ebe1"></Progress>
        </div>
        <div className="mid-bottom">
          当前背诵进度：{initpoetry.nowCount}/{initpoetry.totalCount}
        </div>
      </div>
      <div className="bottom">
        <div className="day">
          <div className="day-time">
            <div className="value">{inittime.todayTime}</div>
            <div className="title">今日背诵时长</div>
          </div>
          <div className="day-cont">
            <div className="value"> {inittime.todayCount}</div>
            <div className="title">今日背诵数量</div>
          </div>
        </div>
        <div className="week">
          <div className="week-time">
            <div className="value">{inittime.weekTime}</div>
            <div className="title">7天内背诵时长</div>
          </div>
          <div className="week-cont">
            <div className="value"> {inittime.weekCount}</div>
            <div className="title">7天内背诵数量</div>
          </div>
        </div>
        <div className="month">
          <div className="month-time">
            <div className="value">{inittime.monthTime}</div>
            <div className="title">30天内背诵时长</div>
          </div>
          <div className="month-cont">
            <div className="value"> {inittime.monthCount}</div>
            <div className="title">30天内背诵数量</div>
          </div>
        </div>
      </div>
      <Popup
        visible={Popvisible}
        onMaskClick={() => {
          setPopVisible(false)
        }}
        bodyStyle={{ height: '70vh' }}>
        <div className="title">更换背诵诗集</div>
        {initauthor.map((item, index) => (
          <div
            key={index}
            onClick={() => choseauthor(index)}
            className="author_item">
            {item}诗集
          </div>
        ))}
      </Popup>

      <Apptabbar />
    </div>
  )
}
export default RecitePoetry
