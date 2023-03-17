import React, { useEffect } from 'react'
import Comments from './comments.tsx'
const PoetryComment = (props) => {
  const { id, getCommentsLength } = props
  useEffect(() => {
    //根据古诗id获取评论数据
  }, [id])
  let comments = [
    {
      id: '1',
      user_id: '1',
      poetry_id: '1',
      parent_id: null,
      content: '我是一级评论-1',
      like_count: 3,

      createtime: '2012-1',
      user_info: {
        name: '1',
        img_src: '',
      },
      parent_info: {},
    },
    {
      id: '2',
      user_id: '2',
      poetry_id: '1',
      parent_id: '1',
      content: '我是二级评论-1',
      like_count: 3,

      createtime: '2012-1',
      user_info: {
        name: '2',
        img_src: '',
      },
      parent_info: {
        name: '1',
        img_src: '',
      },
    },
    {
      id: '3',
      user_id: '1',
      poetry_id: '1',
      parent_id: '2',
      content: '我是三级级评论-1',
      like_count: 3,

      createtime: '2012-1',
      user_info: {
        name: '1',
        img_src: '',
      },
      parent_info: {
        name: '2',
        img_src: '',
      },
    },
    {
      id: '6',
      user_id: '2',
      poetry_id: '1',
      parent_id: '3',
      content: '我是四级级评论-1',
      like_count: 3,

      createtime: '2012-1',
      user_info: {
        name: '2',
        img_src: '',
      },
      parent_info: {
        name: '1',
        img_src: '',
      },
    },
    {
      id: '4',
      user_id: '5',
      poetry_id: '1',
      parent_id: null,
      content: '我是一级评论-2',
      like_count: 3,

      createtime: '2012-1',
      user_info: {
        name: '5',
        img_src: '',
      },
      parent_info: {},
    },
    {
      id: '5',
      user_id: '6',
      poetry_id: '1',
      parent_id: '4',
      content: '我是二级评论-2',
      like_count: 3,

      createtime: '2012-1',
      user_info: {
        name: '6',
        img_src: '',
      },
      parent_info: {
        name: '5',
        img_src: '',
      },
    },
    {
      id: '7',
      user_id: '5',
      poetry_id: '1',
      parent_id: '5',
      content: '我是三级评论-2',
      like_count: 3,

      createtime: '2012-1',
      user_info: {
        name: '5',
        img_src: '',
      },
      parent_info: {
        name: '6',
        img_src: '',
      },
    },
    {
      id: '6',
      user_id: '6',
      poetry_id: '1',
      parent_id: null,
      content: '我是一级级评论-2',
      like_count: 3,
      hate_count: 3,
      createtime: '2012-1',
      user_info: {
        name: '6',
        img_src: '',
      },
      parent_info: {},
    },
  ]
  console.log(comments.length)
  getCommentsLength(comments.length)
  //数据处理
  const DataProcess = (temp) => {
    let arr1 = []
    for (var i = 0; i < comments.length; i++) {
      if (comments[i].parent_id === temp) {
        arr1.push(comments[i])
        comments[i].child = DataProcess(comments[i].id)
      }
    }
    return arr1
  }
  const res = DataProcess(null)
  console.log(res)
  return (
    <div>
      <Comments comments={res} />
    </div>
  )
}
export default PoetryComment
