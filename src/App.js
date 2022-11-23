
// 导入路由
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

// 导入页面组件
import My from './pages/My/index.tsx'
import Poetry from './pages/Poetry/index.tsx'
import Tea from './pages/Tea/index.tsx'
import RecitePoetry from './pages/RecitePoetry/index.tsx'
import Myplan from './pages/Myplan/index.tsx'
import PoetryDetail from './pages/PoetryDetail/index.tsx'
function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/poetry" />} />
          <Route path="/my" element={<My />} />
          <Route path="/poetry" element={<Poetry />} />
          <Route path="/tea" element={<Tea />} />
          <Route path="/recitepoetry" element={<RecitePoetry />} />
          <Route path="/myplan" element={<Myplan />} />
          <Route path="/poetrydetail" element={<PoetryDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
