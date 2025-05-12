import './style/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './signup.tsx'
import Test from './test.tsx'
import LoginComponent from './login.tsx'
import Todos from './todos.tsx'



export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  )
}


