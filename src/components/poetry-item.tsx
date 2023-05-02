import React from 'react'
import { useNavigate } from 'react-router-dom'
import './poetry-item.scss'
import { history } from '../utils/index.js'
const Poetryitem = (props) => {
  const { value, showAuthor } = props
  const { id, title, content, dynasty, author } = value
  const colorList = [
    '#e9e4d1',
    '#d8d4c8',
    '#bec1ac',
    '#cbc7a1',
    '#bdb99c',
    '#9d9d81',
    '#dfcfbc',
  ]

  const color = colorList[Math.floor(Math.random() * 7)]
  // console.log(color, 'color')
  const navigate = useNavigate()
  const handldpoetrydetail = () => {
    // history.push(`/poetrydetail?id=${id}`)
    navigate(`/poetrydetail?id=${id}`)
  }
  // :style="{'--color': color}"
  return (
    <div className="poetry" onClick={handldpoetrydetail}>
      <div className="title4">{title}</div>
      {showAuthor ? (
        <div className="author3">{'[' + dynasty + ']' + author}</div>
      ) : null}
      <div>{content.split('。')[0]}</div>
    </div>
  )
}
export default Poetryitem
