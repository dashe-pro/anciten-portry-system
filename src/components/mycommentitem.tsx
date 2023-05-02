import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './commentitem.scss'
import { history } from '../utils/index.js'
import { Card, Toast, Button, Image } from 'antd-mobile'
import { HeartOutline } from 'antd-mobile-icons'

const Mycommentitem = (props) => {
  const { value } = props
  const { id, userId, type, likeCount, createTime, content, objectId } = value
  const navigate = useNavigate()

  function convertTimestampToDate(timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }
  const Title = () => {
    return (
      <div className="commenttitle">
        <div className="commentinfo">
          <div className="commentinfo-user">
            {type == 1 ? '诗词评论' : '动态评论'}
          </div>
          <div className="commentinfo-time">
            {convertTimestampToDate(createTime)}
          </div>
        </div>
      </div>
    )
  }

  const Right = () => {
    return (
      <div className="commentright">
        <HeartOutline />
        {likeCount}
      </div>
    )
  }
  const navtodetail = () => {
    if (type == 1) {
      navigate(`/poetrydetail?id=${objectId}`)
    } else {
      navigate(`/dynamicdetail?id=${objectId}`)
    }
  }
  return (
    <div onClick={navtodetail}>
      <Card className="commentcard1" title={<Title />} extra={<Right />}>
        <div>
          <div className="commentcontent">{content}</div>
        </div>
      </Card>
    </div>
  )
}
export default Mycommentitem
