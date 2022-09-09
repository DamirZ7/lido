// import Loadable from 'react-loadable'
import React, { Suspense } from 'react'
import './scss/app.scss'
import Home from './pages/Home'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

// const Cart = Loadable({
//   loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
//   loading: () => <div>Идет загрузка</div>,
// })
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'))
const ContactForm = React.lazy(
  () => import(/* webpackChunkName: "ContactForm" */ './pages/ContactForm'),
)

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route
          path='cart'
          element={
            <Suspense fallback={<div>Идет загрузка</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path='cart/checkout'
          element={
            <Suspense fallback={<div>Идет загрузка</div>}>
              <ContactForm />
            </Suspense>
          }
        />
        <Route
          path='pizza/:id'
          element={
            <Suspense fallback={<div>Идет загрузка</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<div>Идет загрузка</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
