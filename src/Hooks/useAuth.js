import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

function useAuth() {
    // context ref
    const context = useContext(AuthContext)
  return context
}

export default useAuth
