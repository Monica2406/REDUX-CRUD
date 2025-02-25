import React, {createContext, useState, useEffect} from 'react'

// context instance
export const AuthContext = createContext()

// context provider component
function AuthProvider(props) {
    const [token, setToken] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
      if(sessionStorage.getItem("token") && sessionStorage.getItem("isLogin")) {
        setToken(sessionStorage.getItem("token"))
        setIsLogin(sessionStorage.getItem("isLogin"))
      }
    },[token, isLogin])

  return (
   
   <AuthContext.Provider value={{token,setToken,isLogin,setIsLogin}}>
            { props.children }
    </AuthContext.Provider>
  )
}

export default AuthProvider
