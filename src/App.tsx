import { Route, Routes } from 'react-router-dom'
import Layout from './layout'
import Home from './pages/home/home'
import Resolve from './pages/resolve/resolve'
import Team from './pages/team/team'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="resolve" element={<Resolve />} />
        <Route path="team" element={<Team />} />
      </Route>
    </Routes>
  )
}

export default App
