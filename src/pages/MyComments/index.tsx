import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, Dialog, Toast, Form, Input } from 'antd-mobile'
import '../../components/nav.scss'
import { Tabs } from 'antd'
import './index.scss'
import '../../components/fixnav.scss'
import { http } from '../../utils/index.js'
import Mycommentitem from '../../components/mycommentitem.tsx'
const Mycomments = () => {
  const navigate = useNavigate()

  const [commentList, setCommentList] = useState([])

  useEffect(() => {
    const getcomment = async () => {
      const res = await http.get(
        `/comment/myComment?userId=${window.localStorage.getItem(
          'id'
        )}&pageNo=1`
      )
      console.log(res)
      setCommentList(res.data.data.list)
    }
    getcomment()
  }, [])

  return (
    <div>
      <NavBar className="nav " onBack={() => navigate('/my')}>
        我的评论
      </NavBar>
      {commentList.map((item) => (
        <Mycommentitem key={item.id} value={item} />
      ))}
    </div>
  )
}
export default Mycomments
