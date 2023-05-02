import React, { useState, useEffect } from 'react'
import { Col, Row, Tabs, Input } from 'antd'
import { AddCircleOutline } from 'antd-mobile-icons'
import Dynamicitem from '../../../components/dynamic-item.tsx'
import './dynamic.scss'
import { http } from '../../../utils'
import { InfiniteScroll } from 'antd-mobile'
const { Search } = Input
const Dynamic = () => {
  const [search, setSearch] = useState(false) //是否内容查询
  const [searchvalue, setSearchValue] = useState(false) //是否内容查询
  const onSearch = (value) => {
    setPageNo(2)
    setSearch(true)
    setSearchValue(value)
    getDynamicSelect(value)
  }
  async function getDynamicSelect(value) {
    const res = await http.get(
      `/community/contentPart?contentPart=${value}&pageNo=1`
    )
    console.log(res)
    setInitDynamic(res.data.data.list)
  }

  const [initdynamic, setInitDynamic] = useState([]) //初始化的动态
  const getinitDynamic = async () => {
    const res = await http.get('/community/selectMoments?pageNo=1')
    console.log(res, 'res')
    setInitDynamic(res.data.data.list)
  }
  useEffect(() => {
    //请求返回所以的动态
    getinitDynamic()
  }, [])

  const [hasMore, setHasMore] = useState(true)
  const [pageNo, setPageNo] = useState(2)

  async function loadMore() {
    if (search) {
      const res = await http.get(
        `/community/contentPart?contentPart=${searchvalue}&pageNo=${pageNo}`
      )
      console.log(res)
      let append = res.data.data.list
      setInitDynamic((val) => [...val, ...append])
      setHasMore(append.length > 0)
      setPageNo(pageNo + 1)
    } else {
      const res = await http.get(`/community/selectMoments?pageNo=${pageNo}`)
      console.log(res)
      let append = res.data.data.list
      setInitDynamic((val) => [...val, ...append])
      setHasMore(append.length > 0)
      setPageNo(pageNo + 1)
    }
  }
  return (
    <div className="dynamics">
      <Search
        className="search"
        placeholder="搜索动态内容"
        onSearch={onSearch}
      />

      <div className="dynamics-content">
        {initdynamic.map((item) => (
          <Dynamicitem key={item.id} value={item} />
        ))}
      </div>
      <InfiniteScroll threshold={10} loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}
export default Dynamic
