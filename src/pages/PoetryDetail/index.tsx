import React from 'react'
import { NavBar, Space, Toast, Tabs } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { history } from '../../utils/index.js'
import { SoundOutline, StarOutline, StarFill } from 'antd-mobile-icons'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import VideoPopup from './components/VideoPopup.tsx'
import PoetryComment from '../../components/poetry-comment.jsx'

const PoetryDetail = () => {
  const [videoVisible, setVideoVisible] = useState(false)
  const [collection, setCollection] = useState(false) //存放是否收藏
  const [params] = useSearchParams()
  //拿到路由id
  const id = params.get('id')

  useEffect(() => {
    const getpoetryinfo = () => {
      //根据id拿去诗词信息
      //根据诗人id去拿诗人信息
      console.log(id, 'id')
    }
    getpoetryinfo()
  }, [id])
  const poetry = {
    id: id,
    name: '春晓',
    author_id: '1',
    content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
    dynasty: '唐',
    audio_src: '1',
    appreciation: '这首诗词非常不错',
    translation: '春天来了万物复苏',
  }
  const author = {
    id: '1',
    describe:
      '孟浩然(689-740)，名浩，字浩然，号孟山人，襄州襄阳现湖北襄阳人，世称孟襄阳。因他未曾入仕，又称之为孟山人，是唐代著名的山水田园派诗人。孟浩然生当盛唐，早年有志用世，在仕途困顿、痛苦失望后，尚能自重，不媚俗世，以隐士终身。',
    name: '孟浩然',
    dynasty: '唐',
    poetry: [{}],
  }
  const poetrycontent = poetry.content.split('。')

  const handlecollection = () => {
    if (collection === false) {
      setCollection(true)
      Toast.show({
        icon: 'success',
        content: '收藏成功',
      })
    } else {
      setCollection(false)
      Toast.show({
        icon: 'fail',
        content: '取消收藏',
      })
    }
  }
  const handleSound = () => {
    if (poetry.audio_src === '') {
      Toast.show({
        icon: 'fail',
        content: '此诗暂时没有音频资源',
      })
    } else {
      setVideoVisible(true)
    }
  }
  const [commentsLength, setCommentsLength] = useState<Number>() //存放评论区长度
  const getCommentsLength = (val: Number) => {
    setCommentsLength(val)
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
  return (
    <div>
      <NavBar onBack={() => history.go(-1)} right={right}></NavBar>
      <div>
        <div>{poetry.name}</div>
        <div>{'[' + poetry.dynasty + ']' + author.name}</div>
        {poetrycontent.map((item) => (
          <div>{item}</div>
        ))}
      </div>
      <Tabs>
        <Tabs.Tab title="赏析" key="1">
          {poetry.appreciation}
        </Tabs.Tab>
        <Tabs.Tab title="作者" key="2">
          {author.describe}
        </Tabs.Tab>
        <Tabs.Tab title="译文" key="3">
          {poetry.translation}
        </Tabs.Tab>
        <Tabs.Tab
          title={
            commentsLength == null
              ? '评论'
              : '评论' + '(' + commentsLength + ')'
          }
          key="4">
          <PoetryComment id={id} getCommentsLength={getCommentsLength} />
        </Tabs.Tab>
      </Tabs>
      <VideoPopup
        videoVisible={videoVisible}
        setVideoVisible={setVideoVisible}
        name={poetry.name}
        audio_src={poetry.audio_src}
      />
    </div>
  )
}
export default PoetryDetail
