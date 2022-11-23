import React, { useEffect } from 'react'
import './comment-item.scss'
import { Avatar, Card } from 'antd'
const { Meta } = Card

const CommentItem = (props) => {
  const { Data } = props
  console.log(Data)
  return (
    <div>
      {Data.map((item) => (
        <Card
          bodyStyle={{ padding: '0,0,20px,10px' }}
          bordered={false}
          style={{
            width: '50.334vw',
            marginTop: 0,
          }}>
          <Meta
            avatar={<Avatar src="" />}
            title={item.user_info.name}
            description={item.content}
          />
          <div>{item.createtime}</div>
          <div className="padding-control">
            <CommentItem Data={item.child}></CommentItem>
          </div>
        </Card>
      ))}
    </div>
  )
}
export default CommentItem
