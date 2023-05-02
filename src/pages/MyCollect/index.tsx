import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, Dialog, Toast, Form, Input } from 'antd-mobile'
import '../../components/nav.scss'
import '../../components/fixnav.scss'
import Poetryitem from '../../components/poetry-item.tsx'

import { http } from '../../utils'
const Mycollect = () => {
  const navigate = useNavigate()

  // const back = () => {
  //   navigate('/my')
  // }

  const [collectList, setCollectList] = useState([])

  useEffect(() => {
    const getcollect = async () => {
      const res = await http.get(
        `/collect/getMyCollect?userId=${window.localStorage.getItem(
          'id'
        )}&pageNo=1`
      )
      console.log(res)
      setCollectList(res.data.data.poetryList)
    }
    getcollect()
  }, [])

  return (
    <div>
      <NavBar className="nav " onBack={() => navigate('/my')}>
        我的收藏
      </NavBar>
      <div>
        {collectList.map((item) => (
          <Poetryitem key={item.id} value={item} showAuthor={true} />
        ))}
      </div>
    </div>
  )
}
export default Mycollect
