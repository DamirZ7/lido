import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ModalCart from '../components/ModalCart'

const MainLayout: React.FC = () => {
  return (
    <>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <Outlet />
        </div>
        <ModalCart />
      </div>
      <Footer />
    </>
  )
}

export default MainLayout
