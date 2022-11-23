import React from 'react'
import { useNavigate } from 'react-router-dom'

import { history } from '../utils/index.js'
const Poetryitem = (props) => {
  const { value } = props
  const { id, name, dynasty, author, author_des, content } = value
  const navigate = useNavigate()
  const handldpoetrydetail = () => {
    // history.push(`/poetrydetail?id=${id}`)
    navigate(`/poetrydetail?id=${id}`)
  }

  return (
    <div onClick={handldpoetrydetail}>
      <div>{name}</div>
      <div>{dynasty + '/' + author}</div>
      <div>{content.split('。')[0]}</div>
    </div>
  )
}
export default Poetryitem
