import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './commentitem.scss'
import { history, http } from '../utils/index.js'
import { Card, Toast, Button, Image, ActionSheet } from 'antd-mobile'
import {
  DownOutline,
  HeartOutline,
  HeartFill,
  MessageOutline,
  MessageFill,
} from 'antd-mobile-icons'

import { Avatar, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const Commentitem = (props) => {
  const [addlike, setAddLike] = useState(false) //存放是否点赞
  const { value, type } = props
  const {
    id,
    userId,
    username,
    avatar,
    img,
    likeCount,
    createTime,
    content,
    privateFlag,
  } = value
  const [likecount, setlikecount] = useState(likeCount) //存放是否点赞
  const handleaddlike = async () => {
    if (addlike === false) {
      setAddLike(true)
      setlikecount(likecount + 1)
      const res = await http.get(`/comment/addLike?id=${id}&type=${1}`)

      if (res.data.message == '成功') {
        Toast.show({
          icon: 'success',
          content: '点赞成功',
        })
      }
    } else {
      setAddLike(false)
      setlikecount(likecount - 1)
      const res = await http.get(`/comment/deleteLike?id=${id}&type=${1}`)
      if (res.data.message == '成功') {
        Toast.show({
          icon: 'fail',
          content: '取消点赞',
        })
      }
    }
  }
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
        <div className="commentavatar">
          <Avatar src={avatar} size="small" icon={<UserOutlined />} />
        </div>
        <div className="commentinfo">
          <div className="commentinfo-user">{username}</div>
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
        <span className="heart" onClick={handleaddlike}>
          {addlike ? <HeartFill /> : <HeartOutline />}
          {likecount ? likecount : null}
        </span>

        <span>
          <DownOutline onClick={() => setVisible(true)} />
        </span>
      </div>
    )
  }
  const [visible, setVisible] = useState(false)
  const actions: Action[] = [
    {
      text: '举报',
      key: 'report',
      danger: 'true',
      onClick: async () => {
        const result = await http.get(`/examine/add?id=${id}&type=${type}`)
        if (result) {
          Toast.show('已举报，等待人工审核')
        }
      },
    },
  ]
  return (
    <div>
      <Card className="commentcard1" title={<Title />} extra={<Right />}>
        <div>
          <div className="commentcontent">{content}</div>
        </div>
      </Card>
      <ActionSheet
        cancelText="取消"
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
      />
    </div>
  )
}
export default Commentitem
