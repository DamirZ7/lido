import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const MainLayout: React.FC = () => {
  return (
    <>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
      <Footer />
    </>
  )
}

export default MainLayout
