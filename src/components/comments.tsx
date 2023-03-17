import React, { useEffect, useState } from 'react'
import { Avatar, Card, Row, Col } from 'antd'
import CommentItem from './comment-item.tsx'
import { LikeOutlined, LikeFilled, MessageOutlined } from '@ant-design/icons'
const { Meta } = Card

const Comments = (props) => {
  const { comments } = props
  console.log(comments)
  const [collection, setCollection] = useState(false) //存放是否点赞
  const handlecollection = () => {
    if (collection === false) {
      setCollection(true)
    } else {
      setCollection(false)
    }
  }
  return (
    <div>
      {comments.map((item) => (
        <Card
          title={
            <div>
              <Meta
                avatar={<Avatar src="" />}
                title={item.user_info.name}
                description={item.content}
              />
              <Row>
                <Col span={6}>
                  <span onClick={handlecollection}>
                    {collection ? <LikeFilled /> : <LikeOutlined />}
                    {item.like_count}
                  </span>
                </Col>
                <Col span={6}>
                  <span>
                    <MessageOutlined />
                  </span>
                </Col>
              </Row>
            </div>
          }
          extra={<div>{item.createtime}</div>}
          style={{
            width: '93.334vw',
            marginTop: 5,
          }}>
          <CommentItem Data={item.child}></CommentItem>
        </Card>
      ))}
    </div>
  )
}
export default Comments
