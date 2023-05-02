import React from 'react'
import { NavBar, Space, Toast, Tabs, InfiniteScroll } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { history } from '../../utils/index.js'
import { SoundOutline, StarOutline, StarFill } from 'antd-mobile-icons'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Commentitem from '../../components/commentitem.tsx'
import './index.scss'
import { http } from '../../utils/index.js'
import '../../components/nav.scss'
import Commenttool from '../../components/commenttool.tsx'
const PoetryDetail = () => {
  const [videoVisible, setVideoVisible] = useState(false)
  const [collection, setCollection] = useState(false) //存放是否收藏
  const [info, setInfo] = useState({
    id: null,
    title: '',
    author: '',
    content: '',
    dynasty: '',
    annotation: '',
    intro: '',
    translation: '',
  })
  const [commentList, setCommentList] = useState([])
  const [params] = useSearchParams()
  //拿到路由id
  const id = params.get('id')
  const intid = parseInt(params.get('id'))
  console.log(intid, id)

  const getcommentlist = async () => {
    const res = await http.get(
      `/comment/poetryComment?poetryId=${intid}&pageNo=1`
    )
    console.log(res)

    setCommentList(res.data.data.list)
  }
  useEffect(() => {
    const getpoetryinfo = async () => {
      const res = await http.get(`/poetry/getPoetryById?id=${id}`)
      console.log(res, 'res')
      setInfo(res.data.data.poetry)
    }

    getpoetryinfo()
    getcommentlist()
  }, [id])

  const poetrycontent = info.content.split('。')

  const handlecollection = async () => {
    if (collection === false) {
      setCollection(true)
      const res = await http.get(
        `/collect/poetry?userId=${window.localStorage.getItem(
          'id'
        )}&poetryId=${id}`
      )
      if (res.data.message == '成功') {
        Toast.show({
          icon: 'success',
          content: '收藏成功',
        })
      }
    } else {
      setCollection(false)
      const res = await http.get(
        `/collect/delete?userId=${window.localStorage.getItem(
          'id'
        )}&poetryId=${id}`
      )
      if (res.data.message == '成功') {
        Toast.show({
          icon: 'fail',
          content: '取消收藏',
        })
      }
    }
  }
  const handleSound = () => {
    Toast.show({
      content: '正在播放音频资源，请调高音量！',
    })
    let synth = window.speechSynthesis
    let utterThis = new SpeechSynthesisUtterance(
      info.title + '。' + info.dynasty + info.author + '。' + info.content
    )
    utterThis.pitch = 1 //音调
    utterThis.rate = 0.6 //速度
    synth.speak(utterThis)
  }

  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <div onClick={() => handleSound()}>
          <SoundOutline />
        </div>
        <div onClick={() => handlecollection()}>
          {collection ? <StarFill /> : <StarOutline />}
        </div>
      </Space>
    </div>
  )
  const Nodata = (prop) => {
    const { name } = prop
    return (
      <div>
        <div className="flower" />
        <div className="font">该古诗暂时没有{name}</div>
      </div>
    )
  }
  const [hasMore, setHasMore] = useState(true)
  const [pageNo, setPageNo] = useState(2)

  async function loadMore() {
    const res = await http.get(
      `/comment/poetryComment?poetryId=${id}&pageNo=${pageNo}`
    )

    console.log(res)
    let append = res.data.data.list
    setCommentList((val) => [...val, ...append])
    setHasMore(append.length > 0)
    setPageNo(pageNo + 1)
  }
  return (
    <div>
      <NavBar className="nav" onBack={() => history.go(-1)} right={right}>
        详情
      </NavBar>
      <div className="poetry1">
        <div className="poetry1-content">
          <div className="title5">{info.title}</div>
          <div className="author">{'[' + info.dynasty + ']' + info.author}</div>
          {poetrycontent.map((item) => (
            <div className="content">{item}</div>
          ))}
        </div>
      </div>
      <Tabs>
        <Tabs.Tab title="介绍" key="1">
          {info.intro ? info.intro : <Nodata name="介绍" />}
        </Tabs.Tab>
        <Tabs.Tab title="注释" key="2">
          {info.annotation ? info.annotation : <Nodata name="注释" />}
        </Tabs.Tab>
        <Tabs.Tab title="译文" key="3">
          {info.translation ? info.translation : <Nodata name="译文" />}
        </Tabs.Tab>
        <Tabs.Tab title="评论" key="4">
          <div>
            {commentList.map((item) => (
              <Commentitem key={item.id} value={item} type={1} />
            ))}
            <InfiniteScroll
              threshold={10}
              loadMore={loadMore}
              hasMore={hasMore}
            />
          </div>
          <Commenttool objectId={id} type={1} />
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}
export default PoetryDetail
