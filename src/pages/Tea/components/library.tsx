import React, { useState, useEffect } from 'react'
import { Col, Row, Tabs, Input } from 'antd'
import { AddCircleOutline } from 'antd-mobile-icons'
import { Select, Form, Button } from 'antd'
import { http } from '../../../utils'
import { InfiniteScroll } from 'antd-mobile'
import './library.scss'
import { FloatButton } from 'antd'
import Poetryitem from '../../../components/poetry-item.tsx'
import Backtotop from '../../../components/backtotop.tsx'
const { Search } = Input
const Library = () => {
  const [initpoetry, setInitPoetry] = useState([]) //初始化的古诗
  const [pageNo, setPageNo] = useState(2) //页数
  const [initauthor, setInitAuthor] = useState([]) //初始化的诗人
  const [select, setSelect] = useState(false) //是否条件查询
  const [selectcondition, setSelectCondition] = useState({
    author: '',
    kind_cn: '',
    dynasty: '',
  }) //条件
  const [search, setSearch] = useState(false) //是否内容查询
  const [searchcontent, setSearchContent] = useState('') //内容查询

  const getHotAuthor = async () => {
    const res = await http.get('/author/someAuthor')
    let options = []
    res.data.data.list.map((item) => {
      const param = { value: '', label: '' }
      param.label = item
      param.value = item
      options.push(param)
    })

    setInitAuthor(options)
  }

  const getRandomPoetry = async () => {
    const res = await http.get('/poetry/getPoetryPage?pageNo=1')
    console.log(res, 'res')
    setInitPoetry(res.data.data.poetryList)
  }
  useEffect(() => {
    //请求返回所以有的诗人
    getHotAuthor()
    getRandomPoetry()
  }, [])
  //条件查询确定回调
  const onFinish = (values) => {
    setSelect(true)
    setSearch(false)
    setPageNo(2)
    setSelectCondition({
      author: values.author,
      kind_cn: values.kind_cn,
      dynasty: values.dynasty,
    })
    values.pageNo = 1

    getPoetrySelect(values)
  }
  async function getPoetrySelect(value) {
    const res = await http.post(`/poetry/getPoetrySelectively`, { ...value })
    console.log(res)

    setInitPoetry(res.data.data.poetryList)
  }

  const [hasMore, setHasMore] = useState(true)

  async function loadMore() {
    if (select) {
      setPageNo(pageNo + 1)
      const res = await http.post(`/poetry/getPoetrySelectively`, {
        ...selectcondition,
        pageNo: pageNo,
      })
      let append = res.data.data.poetryList
      setInitPoetry((val) => [...val, ...append])
      setHasMore(append.length > 0)
    } else if (search) {
      setPageNo(pageNo + 1)
      const res = await http.get(
        `/poetry/searchContent?pageNo=${pageNo}&content=${searchcontent}`
      )
      let append = res.data.data.poetryList
      setInitPoetry((val) => [...val, ...append])
      setHasMore(append.length > 0)
    } else {
      const res = await http.get(`/poetry/getPoetryPage?pageNo=1`)
      let append = res.data.data.poetryList
      setInitPoetry((val) => [...val, ...append])
      setHasMore(append.length > 0)
    }
  }
  //搜索回调
  const onSearch = (value) => {
    setSearch(true)
    setSelect(false)
    setPageNo(2)
    setSearchContent(value)
    const values = {
      pageNo: 1,
      content: value,
    }

    getPoetrySearch(values)
  }
  async function getPoetrySearch(values) {
    const res = await http.get(
      `/poetry/searchContent?pageNo=${values.pageNo}&content=${values.content}`
    )
    console.log(res)

    setInitPoetry(res.data.data.poetryList)
  }
  return (
    <div className="library">
      <Search placeholder="搜素古诗内容" onSearch={onSearch} />
      <div>
        <Form name="value" autoComplete="off" onFinish={onFinish}>
          <Row>
            <Col span={8}>
              <Form.Item name="author">
                <Select
                  allowClear
                  showSearch
                  placeholder="热门诗人"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={initauthor}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="dynasty">
                <Select
                  allowClear
                  showSearch
                  placeholder="朝代"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: '商',
                      label: '商',
                    },
                    {
                      value: '周',
                      label: '周',
                    },
                    {
                      value: '秦',
                      label: '秦',
                    },
                    {
                      value: '汉',
                      label: '汉',
                    },
                    {
                      value: '三国',
                      label: '三国',
                    },

                    {
                      value: '晋',
                      label: '晋',
                    },
                    {
                      value: '南北朝',
                      label: '南北朝',
                    },
                    {
                      value: '隋',
                      label: '隋',
                    },
                    {
                      value: '唐',
                      label: '唐',
                    },
                    {
                      value: '五代十国',
                      label: '五代十国',
                    },
                    {
                      value: '宋',
                      label: '宋',
                    },
                    {
                      value: '金',
                      label: '金',
                    },
                    {
                      value: '元',
                      label: '元',
                    },
                    {
                      value: '明',
                      label: '明',
                    },
                    {
                      value: '清',
                      label: '清',
                    },
                    {
                      value: '现代',
                      label: '现代',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="kindCn">
                <Select
                  allowClear
                  showSearch
                  placeholder="类型"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: '诗',
                      label: '诗',
                    },
                    {
                      value: '词',
                      label: '词',
                    },
                    {
                      value: '文',
                      label: '文',
                    },
                    {
                      value: '曲',
                      label: '曲',
                    },
                    {
                      value: '赋',
                      label: '赋',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item>
                <Button htmlType="submit">确定</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        {initpoetry.map((item) => (
          <Poetryitem key={item.id} value={item} showAuthor={true} />
        ))}
      </div>
      <Backtotop />
      <InfiniteScroll threshold={10} loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}
export default Library
