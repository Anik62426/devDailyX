import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header.jsx'

function App() {
  return (
    <>
    <div>
      <Header />
      <div className='w-full flex justify-center'>
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default App
