import React from 'react'
import { NavLink } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import authApi from '../API/AuthAPI'
import { toast } from 'react-toastify'
function Menu() {
    const {isLogin,setToken,setIsLogin }=useAuth()

    const logoutHandler=async()=>{
        if(window.confirm(`Are  you sure to logout?`)){
            await authApi.logout()
            .then(res=>{
                toast.success(res.data.msg)
                setToken(false)
                setIsLogin(false)
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('isLogin')

            }).catch(err=>toast.error(err.response.data.msg))
        }
    }
  return (
  <>
      <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
        <div className="container">
            <NavLink to={`/`}className="navbar-brand">Expense Tracker</NavLink>

            <button className="btn btn-outline-warning" data-bs-toggle="offcanvas" data-bs-target="#sideMenu">
                <span className="navbar-toggler-icon"></span>
            </button>
        </div>
    </nav>

        {/* side navigation, offcanvas-start(left), offcanvas-end(right) */}
        <div className="offcanvas offcanvas-end" id="sideMenu" tabIndex={-1}>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title text-secondary">Expense Tracker</h5>
                <button className="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div className="offcanvas-body">
                {
                    isLogin ? (
                <ul className='list-group text-center'>
                    <li className='list-group-item nav-item'>
                        <NavLink to={`/`} className='nav-link'>Home</NavLink>

                    </li>
                    <li className='list-group-item nav-item'>
                     <NavLink to={`/create`} className="nav-link">Create</NavLink>
                    </li>
                    <li className='list-group-item nav-item'>
                     <NavLink onClick={logoutHandler}className="nav-link btn btn-danger">Logout</NavLink>
                    </li>
                </ul>
                    ): (
                <ul className='list-group text-center'>
                    <li className='list-group-item nav-item'>
                        <NavLink to={`/login`} className='nav-link'>Login</NavLink>
                    </li>
                    <li className='list-group-item nav-item'>
                     <NavLink to={`/register`} className="nav-link">Register</NavLink>
                    </li>
                </ul>
                    )
                     }
                </div>
        </div>
  </>
  )
}

export default Menu