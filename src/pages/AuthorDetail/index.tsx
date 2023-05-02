import React from 'react'
import { NavBar, Space, Toast, Tabs } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { history } from '../../utils/index.js'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Poetryitem from '../../components/poetry-item.tsx'
import '../../components/nav.scss'
import '../../components/fixnav.scss'
import './index.scss'
import { InfiniteScroll } from 'antd-mobile'
import { http } from '../../utils/index.js'

import Backtotop from '../../components/backtotop.tsx'
import { SoundOutline } from 'antd-mobile-icons'
const AuthorDetail = () => {
  const [params] = useSearchParams()
  const [authorinfo, setAuthorInfo] = useState({
    id: null,
    dynasty: '',
    name: '',
    description: '',
  })
  const [initpoetry, setInitPoetry] = useState([])
  const [pageNo, setPageNo] = useState(2)
  //拿到路由id
  const id = params.get('id')

  useEffect(() => {
    const getAuthorPoetrys = async () => {
      //根据id拿去诗人
      //根据诗人id去拿诗人的古诗
      const res1 = await http.get(
        `/author/getAuthorPoetryList?id=${id}&pageNo=1`
      )

      setAuthorInfo(res1.data.data.poetryListDTO.author)
      setInitPoetry(res1.data.data.poetryListDTO.list)
    }
    getAuthorPoetrys()
  }, [id])

  const [hasMore, setHasMore] = useState(true)

  async function loadMore() {
    const res = await http.get(
      `/author/getAuthorPoetryList?id=${id}&pageNo=${pageNo}`
    )
    let append = res.data.data.poetryListDTO.list
    setInitPoetry((val) => [...val, ...append])
    setHasMore(append.length > 0)
    setPageNo(pageNo + 1)
  }
  const handleSound = () => {
    Toast.show({
      content: '正在播放音频资源，请调高音量！',
    })
    let synth = window.speechSynthesis
    let utterThis = new SpeechSynthesisUtterance(authorinfo.description)
    utterThis.pitch = 1 //音调
    utterThis.rate = 0.7 //速度
    synth.speak(utterThis)
  }
  return (
    <div className="authordetail">
      <NavBar className="nav fixnav" onBack={() => history.go(-1)}>
        {authorinfo.dynasty + '·' + authorinfo.name}
      </NavBar>
      <div className="info">
        <div className="title3">诗人介绍:</div>
        <span className="sound" onClick={() => handleSound()}>
          <SoundOutline />
        </span>
        <div>
          {authorinfo.description
            ? authorinfo.description
            : '此诗人没有详细介绍哦'}
        </div>
      </div>
      <div className="poetrys">
        {initpoetry.map((item) => (
          <Poetryitem key={item.id} value={item} showAuthor={false} />
        ))}
      </div>
      <Backtotop />
      <InfiniteScroll threshold={10} loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}
export default AuthorDetail
