import './style/App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './login.tsx'
import Signin from './signin.tsx'
import Test from './test.tsx'



export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}


