
// 导入路由
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'
import { HistoryRouter, history } from './utils/history'
import { Skeleton } from 'antd-mobile'
import './index.css'

const My = lazy(() => import('./pages/My/index.tsx'))
const Poetry = lazy(() => import('./pages/Poetry/index.tsx'))
const Tea = lazy(() => import('./pages/Tea/index.tsx'))
const RecitePoetry = lazy(() => import('./pages/RecitePoetry/index.tsx'))
const Myplan = lazy(() => import('./pages/Myplan/index.tsx'))
const PoetryDetail = lazy(() => import('./pages/PoetryDetail/index.tsx'))
const Login = lazy(() => import('./pages/Login/index.tsx'))
const Register = lazy(() => import('./pages/Register/index.tsx'))
const MyComments = lazy(() => import('./pages/MyComments/index.tsx'))
const AuthorDetail = lazy(() => import('./pages/AuthorDetail/index.tsx'))
const MyCollect = lazy(() => import('./pages/MyCollect/index.tsx'))
const AboutUs = lazy(() => import('./pages/AboutUs/index.tsx'))
const AddDynamic = lazy(() => import('./pages/AddDynamic/index.tsx'))
const DynamicDetail = lazy(() => import('./pages/DynamicDetail/index.tsx'))
function App () {
  return (
    <HistoryRouter history={history}>

      <Suspense fallback={<div><Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={20} animated /></div>
      }>
        <Routes>
          <Route path="/" element={<Navigate to="/poetry" />} />
          <Route path="/my" element={<My />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/poetry" element={<Poetry />} />
          <Route path="/tea" element={<Tea />} />
          <Route path="/recitepoetry" element={<RecitePoetry />} />
          <Route path="/myplan" element={<Myplan />} />
          <Route path="/poetrydetail" element={<PoetryDetail />} />
          <Route path="/authordetail" element={<AuthorDetail />} />
          <Route path="/mycomments" element={<MyComments />} />
          <Route path="/mycollect" element={<MyCollect />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/adddynamic" element={<AddDynamic />} />
          <Route path="/dynamicdetail" element={<DynamicDetail />} />
        </Routes>
      </Suspense>

    </HistoryRouter>
  )
}

export default App
