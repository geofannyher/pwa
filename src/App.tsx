import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './dashboard'
import Testing from './testing'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Testing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
