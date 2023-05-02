import React from 'react'
import { NavBar, Space, Toast, Tabs, InfiniteScroll } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { history } from '../../utils/index.js'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dynamicitem from '../../components/dynamic-item.tsx'
import './index.scss'
import { http } from '../../utils/index.js'
import '../../components/nav.scss'
import '../../components/fixnav.scss'
import Commenttool from '../../components/commenttool.tsx'
import Commentitem from '../../components/commentitem.tsx'
const Dynamicdetail = () => {
  const [dynamiinfo, setDynamiInfo] = useState({})
  const [commentList, setCommentList] = useState([])
  const [params] = useSearchParams()
  //拿到路由id
  const id = params.get('id')

  useEffect(() => {
    const getdynamicinfo = async () => {
      const res = await http.get(`/community/momentDetail?id=${id}&pageNo=1`)
      console.log(res)
      setDynamiInfo(res.data.data.momentDetailDTO.moment)
      setCommentList(res.data.data.momentDetailDTO.commentList)
    }
    getdynamicinfo()
  }, [id])

  const [hasMore, setHasMore] = useState(true)
  const [pageNo, setPageNo] = useState(2)

  async function loadMore() {
    const res = await http.get(
      `/community/momentDetail?id=${id}&pageNo=${pageNo}`
    )
    console.log(res)
    let append = res.data.data.momentDetailDTO.commentList
    setCommentList((val) => [...val, ...append])
    setHasMore(append.length > 0)
    setPageNo(pageNo + 1)
  }

  return (
    <div>
      <NavBar className="nav fixnav" onBack={() => history.go(-1)} right={null}>
        详情
      </NavBar>
      <div className="Dynamicitem">
        <Dynamicitem
          key={dynamiinfo.id}
          value={dynamiinfo}
          type="detail"
          length={commentList.length}
        />
        <div className="detail-bottom">
          <div className="detail-bottom-top">最新评论</div>
          <div>
            {commentList.map((item) => (
              <Commentitem key={item.id} value={item} type={2} />
            ))}
            <InfiniteScroll
              threshold={10}
              loadMore={loadMore}
              hasMore={hasMore}
            />
          </div>
          <Commenttool objectId={id} type={2} />
        </div>
      </div>
    </div>
  )
}
export default Dynamicdetail
