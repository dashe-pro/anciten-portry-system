import React, { useState, useEffect } from 'react'
import Apptabbar from '../../components/app-tabbar.tsx'
import { NavBar, Space, Tabs, Popup } from 'antd-mobile'
import { http } from '../../utils'
import { SearchOutline, MoreOutline, AppstoreOutline } from 'antd-mobile-icons'
import './index.scss'
import moment from 'moment'
import solarLunar from 'solarlunar-es'
import '../../components/nav.scss'
import { useNavigate } from 'react-router-dom'

const Poetry = () => {
  const [poetry, setPoetry] = useState({
    id: null,
    title: '',
    author: '',
    content: '',
    dynasty: '',
  })
  const [author, setAuthor] = useState({
    id: null,
    name: '',
    deathYear: '',
    birthYear: '',
    dynasty: '',
  })
  useEffect(() => {
    //随机获得一首诗词的信息
    //随机获得一个诗人的信息
    const getInitializeInfo = async () => {
      const res1 = await http.get('/poetry/getRandomPoetry')
      console.log(res1, 'res')
      setPoetry(res1.data.data.randomPoetry)
      const res2 = await http.get('/author/getRandomAuthor')
      console.log(res2, 'res')

      setAuthor(res2.data.data.author)
    }
    getInitializeInfo()
  }, [])
  const navigate = useNavigate()
  const handldpoetrydetail = () => {
    // history.push(`/poetrydetail?id=${id}`)
    navigate(`/poetrydetail?id=${poetry.id}`)
  }
  const handldAuthorPoetry = () => {
    // history.push(`/poetrydetail?id=${id}`)
    navigate(`/authordetail?id=${author.id}`)
  }

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
      <AppstoreOutline />
    </div>
  )
  const getLunarAndTerm = () => {
    const Data = solarLunar.solar2lunar(
      moment().year(),
      moment().month() + 1,
      moment().date()
    )

    return Data
  }
  const Date = getLunarAndTerm()
  const randomimg = () => {
    const imgs = [
      'https://img.zcool.cn/community/015bfe5e47ac09a80120a895e10438.jpg@1280w_1l_2o_100sh.jpg',
      'https://img.zcool.cn/community/0170215e183f01a80120a895c82f71.jpg@1280w_1l_2o_100sh.jpg',
      'https://img.zcool.cn/community/0142145e47ac09a801216518f79921.jpg@1280w_1l_2o_100sh.jpg',
      'https://img.zcool.cn/community/01c33b5e47ac0aa8012165182a6e5b.jpg@1280w_1l_2o_100sh.jpg',
      'https://img.zcool.cn/community/01f69a5e47ac09a80120a895004437.jpg@1280w_1l_2o_100sh.jpg',
      'https://img.zcool.cn/community/019edd5e47ac09a801216518d6180f.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/format,webp/quality,q_100',
      'https://img.zcool.cn/community/01b52c5e47ab34a80120a895f0cdbd.jpg@1280w_1l_2o_100sh.jpg',
      'https://img.zcool.cn/community/011c3c5e47ab34a801216518a80850.jpg@2o.jpg',
      'https://img.zcool.cn/community/012cc25e47ac09a80120a895091bfd.jpg@1280w_1l_2o_100sh.jpg',
      'https://img.zcool.cn/community/01514d5e47ac09a801216518b1f507.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/format,webp/quality,q_100',
      'https://img.zcool.cn/community/012b515e47ac09a8012165184a759f.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/format,webp/quality,q_100',
      'https://img.zcool.cn/community/01ddb85e47ac0aa80120a895afc75c.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/format,webp/quality,q_100',
      'https://img.zcool.cn/community/01bb275e47ac0aa80120a89596b257.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/format,webp/quality,q_100',
      'https://img.zcool.cn/community/018f105e47ac0aa8012165181513ce.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/format,webp/quality,q_100',
      'https://img.zcool.cn/community/0130675e47ac0aa80120a895b37fab.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/format,webp/quality,q_100',
      'https://img.zcool.cn/community/0158e05e47ac0aa8012165180f30e5.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/format,webp/quality,q_100',
      'https://img.zcool.cn/community/01a4c75e47ac0aa80120a89584a5f8.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/format,webp/quality,q_100',
    ]
    return imgs[Math.floor(Math.random() * imgs.length)]
  }

  return (
    <div>
      <NavBar className="nav" right={null} back={null} left={null}>
        诗词
      </NavBar>
      <div className="home">
        <div className="lunar">
          <div className="lunarleft">
            <div className="day">{Date.cDay}</div>
            <div className="week">{Date.ncWeek}</div>
          </div>
          <div className="lunarmid">
            <svg
              className="cloud"
              width="51"
              height="17"
              viewBox="0 0 51 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.06085 16.4139C0.403807 15.7292 0 14.7997 0 13.7759C0 11.6715 1.70595 9.96553 3.81034 9.96553C3.91536 9.96553 4.01938 9.96979 4.12225 9.97812C4.10977 9.78012 4.10344 9.58046 4.10344 9.37931C4.10344 4.19926 8.3027 0 13.4827 0C17.4568 0 20.8535 2.47152 22.2198 5.96133C22.8408 6.95766 23.9464 7.6207 25.2069 7.6207C25.247 7.6207 25.2869 7.62002 25.3267 7.61869C26.1877 7.24291 27.1385 7.03447 28.1379 7.03447C29.504 7.03447 30.7791 7.42387 31.8584 8.09774C32.9575 7.07439 34.4315 6.44837 36.0517 6.44837C38.7331 6.44837 41.014 8.16288 41.8579 10.5554C43.3447 10.6009 44.7243 11.0722 45.8788 11.8515C46.2043 11.7684 46.5453 11.7243 46.8966 11.7243C49.1628 11.7243 51 13.5614 51 15.8277C51 16.0267 50.9859 16.2224 50.9585 16.4139H1.06085Z"
                fill="#753A32"
              />
              <path
                d="M31.6552 3.2241C31.6552 4.03348 30.999 4.68961 30.1897 4.68961C29.3803 4.68961 28.7241 4.03348 28.7241 3.2241C28.7241 2.41471 29.3803 1.75858 30.1897 1.75858C30.999 1.75858 31.6552 2.41471 31.6552 3.2241Z"
                fill="#753A32"
              />
            </svg>
          </div>

          <div className="lunarright">
            <div>{Date.gzYear + Date.animal + '年'}</div>
            <div>{Date.gzMonth + '月'}</div>
            <div>{Date.gzDay + '日'}</div>
          </div>
        </div>
        <div className="poetry" onClick={handldpoetrydetail}>
          <img className="poetryleft" src={randomimg()} alt="" />

          <div className="poetryright">
            <div className="title1">今日鉴诗</div>
            <div className="date1">{Date.monthCn + Date.dayCn}</div>

            <div className="poetryinfo">
              <div className="title2">{poetry.title}</div>
              <div className="author1">
                {'[' + poetry.dynasty + ']' + poetry.author}
              </div>
              <div className="content">
                {poetry.content.split('。')[0].split(',')[0]}
              </div>
            </div>
          </div>
        </div>
        <div className="author" onClick={handldAuthorPoetry}>
          <img className="authorleft" src={randomimg()} alt="" />

          <div className="authorright">
            <div className="title1">今日诗人</div>

            <div className="authordes">
              <div className="title2 date3">
                {'[' + author.dynasty + ']'}
                {author.name}
              </div>
              <span>
                生卒年（{author.birthYear == '?' ? '不详' : author.birthYear}--
                {author.deathYear == '?' ? '不详' : author.deathYear}）
              </span>
            </div>
          </div>
        </div>
      </div>

      <Apptabbar />
    </div>
  )
}
export default Poetry
