import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './dynamic-item.scss'
import { history, http } from '../utils/index.js'
import { Card, Toast, Button, Image } from 'antd-mobile'
import {
  DownOutline,
  HeartOutline,
  HeartFill,
  MessageOutline,
  MessageFill,
} from 'antd-mobile-icons'
import { ActionSheet } from 'antd-mobile'
import { Avatar, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const Dynamicitem = (props) => {
  const [addlike, setAddLike] = useState(false) //存放是否点赞
  const { value, type, length } = props
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

  const navigate = useNavigate()
  const handlddynamicdetail = () => {
    // history.push(`/poetrydetail?id=${id}`)
    navigate(`/dynamicdetail?id=${id}`)
  }

  const handleaddlike = async () => {
    if (addlike === false) {
      setAddLike(true)
      setlikecount(likecount + 1)
      const res = await http.get(`/comment/addLike?id=${id}&type=${2}`)

      if (res.data.message == '成功') {
        Toast.show({
          icon: 'success',
          content: '点赞成功',
        })
      }
    } else {
      setAddLike(false)
      setlikecount(likecount - 1)
      const res = await http.get(`/comment/deleteLike?id=${id}&type=${2}`)
      if (res.data.message == '成功') {
        Toast.show({
          icon: 'fail',
          content: '取消点赞',
        })
      }
    }
  }
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
      <div className="title">
        <div className="avatar">
          <Avatar src={avatar} icon={<UserOutlined />} />
        </div>
        <div className="info">
          <div className="info-user">{username}</div>
          <div className="info-time">{convertTimestampToDate(createTime)}</div>
        </div>
      </div>
    )
  }

  const Right = () => {
    return (
      <div className="right">
        {privateFlag ? <span className="onlyme">仅我可见</span> : null}
        <DownOutline onClick={() => setVisible(true)} />
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
        const result = await http.get(`/examine/add?id=${id}&type=${0}`)
        if (result) {
          Toast.show('已举报，等待人工审核')
        }
      },
    },
  ]
  return (
    <div>
      <Card className="card1" title={<Title />} extra={<Right />}>
        <div>
          <div onClick={handlddynamicdetail} className="dymamic-content">
            {content}
          </div>
          {img ? (
            <Image src={img} width={336} height={200} fit="cover" />
          ) : null}

          <div className="dymamic-footer">
            <div className="heart">
              <span onClick={handleaddlike}>
                {addlike ? <HeartFill /> : <HeartOutline />}
              </span>
              {likecount ? likecount : null}
            </div>
            <div className="comment">
              <MessageOutline onClick={handlddynamicdetail} />
              {type ? length : null}
            </div>
          </div>
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
export default Dynamicitem
