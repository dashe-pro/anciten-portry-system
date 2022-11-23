import React, { useEffect } from 'react'
import { Avatar, Card } from 'antd'
import CommentItem from './comment-item.tsx'
const { Meta } = Card

const Comments = (props) => {
  const { comments } = props
  console.log(comments)
  return (
    <div>
      {comments.map((item) => (
        <Card
          bodyStyle={{ padding: 0 }}
          bordered={false}
          style={{
            width: '93.334vw',
            marginTop: 5,
          }}>
          <Meta
            avatar={<Avatar src="" />}
            title={item.user_info.name}
            description={item.content}
          />
          <div>{item.createtime}</div>
          <CommentItem Data={item.child}></CommentItem>
        </Card>
      ))}
    </div>
  )
}
export default Comments
