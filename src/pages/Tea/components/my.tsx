import React, { useState, useEffect } from 'react'
import { Col, Row, Tabs, Input } from 'antd'

import Dynamicitem from '../../../components/dynamic-item.tsx'
import { http } from '../../../utils'
import { InfiniteScroll } from 'antd-mobile'
const { Search } = Input
const My = () => {
  const [initdynamic, setInitDynamic] = useState([]) //初始化的动态
  const getinitDynamic = async () => {
    const res = await http.get(
      `/community/myMoment?userId=${window.localStorage.getItem('id')}&pageNo=1`
    )

    setInitDynamic(res.data.data.list)
  }
  useEffect(() => {
    //请求返回所以的动态
    getinitDynamic()
  }, [])

  const [hasMore, setHasMore] = useState(true)
  const [pageNo, setPageNo] = useState(2)

  async function loadMore() {
    const res = await http.get(
      `/community/myMoment?userId=${window.localStorage.getItem(
        'id'
      )}&pageNo=${pageNo}`
    )

    let append = res.data.data.list
    setInitDynamic((val) => [...val, ...append])
    setHasMore(append.length > 0)
    setPageNo(pageNo + 1)
  }
  return (
    <div>
      <div className="dynamics">
        {initdynamic.map((item) => (
          <Dynamicitem key={item.id} value={item} />
        ))}
      </div>
      <InfiniteScroll threshold={10} loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}
export default My
