import React, { useEffect, useState } from 'react'
import './comment-item.scss'
import { Avatar, Col, Row } from 'antd'

import { LikeOutlined, LikeFilled, MessageOutlined } from '@ant-design/icons'

const CommentItem = (props) => {
  const { Data, temp } = props
  console.log(Data)
  const [collection, setCollection] = useState(false) //存放是否点赞
  const handlecollection = () => {
    if (collection === false) {
      setCollection(true)
    } else {
      setCollection(false)
    }
  }
  const handleComment = (id) => {
    console.log(id)
  }
  return (
    <div className="commentitems">
      {Data.map((item) => (
        <div className="commentItem">
          <Row>
            <Col span={4}>
              <Avatar className="userImg" src={item.user_info.img_src}></Avatar>
            </Col>
            <Col span={16}>
              <div>{item.user_info.name}</div>
            </Col>
            <Col span={4}>
              <div>{item.createtime}</div>
            </Col>
          </Row>
          <Row>
            <Col span={20}>
              {!temp ? (
                <div>{item.content}</div>
              ) : (
                <div>
                  回复{item.parent_info.name}:{item.content}
                </div>
              )}
            </Col>
          </Row>
          <div className="commentContent">
            <Row>
              <Col span={6}>
                <span onClick={handlecollection}>
                  {collection ? <LikeFilled /> : <LikeOutlined />}
                  {item.like_count}
                </span>
              </Col>
              <Col span={6}>
                <span>
                  <MessageOutlined onClick={() => handleComment(item.id)} />
                </span>
              </Col>
            </Row>
          </div>
          <div>
            <CommentItem Data={item.child} temp={true}></CommentItem>
          </div>
        </div>
      ))}
    </div>
  )
}
export default CommentItem
