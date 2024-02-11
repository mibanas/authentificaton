import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import login from '../assets/images/auth/login.png'

const Login = () => {
  return (
    <div className='flex h-screen w-screen'>
      <div className='flex-1 my-auto'>
        <LoginForm />
      </div>
      <div className='flex-1 flex items-center justify-center'>
        <img src={login} alt="login" className='w-2/3 h-auto' />
      </div>
    </div>
  )
}

export default Login