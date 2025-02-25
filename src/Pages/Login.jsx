import React, { useState } from 'react'
import { NavLink , useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from '../API/AuthAPI'
import useAuth from '../Hooks/useAuth'

function Login(props) {
    const [user,setUser] = useState({
        email : "",
        password : ""
    })
    const { setToken, setIsLogin } = useAuth()
    const navigate = useNavigate()

    const readInput = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log(`user =`, user)
            await authApi.login(user)
                .then(res => {
                    toast.success(res.data.msg)
                    if(res.data.status) {
                        setIsLogin(res.data.status)
                        setToken(res.data.loginToken)
                        sessionStorage.setItem("token", res.data.loginToken)
                        sessionStorage.setItem("isLogin", res.data.status)
                        navigate(`/`)
                    }
                }).catch(err => toast.error(err.response.data.msg))
        } catch(err) {
            return toast.error(err.message)
        }
    }


  return (
    
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-header text-center">
                        <h3 className="card-title text-secondary">Login</h3>
                    </div>

                    <div className="card-body">
                        <form onSubmit={submitHandler} method="POST" autoComplete='off'>
                            <div className="form-group mt-2">
                                <label htmlFor="email">Your Email</label>
                                <input type="email" name="email" id="email" className='form-control' value={user.email} onChange={readInput} required/>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="password">Your Password</label>
                                <input type="password" name="password" id="password" className='form-control' value={user.password} onChange={readInput} required/>
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Login" className='btn btn-outline-secondary' />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <p className="text-secondary">
                            Are you a new user <NavLink to="/register" className="btn btn-link">Register Here</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
