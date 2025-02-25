import React from 'react'
import Menu from './Component/Menu'
import { BrowserRouter,Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Create from './Pages/Create'
import Update from './Pages/Update'
import NotFound from './Pages/NotFound'
import { ToastContainer } from 'react-toastify'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ProtectedRoute from './AuthGuard/ProtectedRoute'
import useAuth from './Hooks/useAuth'

function App(props) {
  const { token, isLogin } = useAuth()
  return (
  <BrowserRouter>
    <Menu />
        <ToastContainer position={"top-center"} autoClose={3000} />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path={`/`} element={<Home />} />
            <Route path={`/create`} element={<Create />} />
            <Route path={`/edit/:transId`} element={<Update />} />
          </Route>
            <Route path={`/login`} element={isLogin ? <Navigate to={`/`}/> : <Login />} />
            <Route path={`/register`} element={<Register />} />
            <Route path={`/*`} element={<NotFound />} />
        </Routes>
  </BrowserRouter>
  )
}

export default App
