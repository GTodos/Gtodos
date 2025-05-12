import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import './style/global.css'
import App from './App.tsx'
import SideBar from './side-bar.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,

)
