import React from 'react'
import RegisterForm from '../../components/auth/RegisterForm'
import register from '../../assets/images/auth/register.png'

const Register = () => {
  return (
    <div className='flex h-screen w-screen'>
    <div className='flex-1 my-auto'>
      <RegisterForm />
    </div>
    <div className='flex-1 flex items-center justify-center'>
      <img src={register} alt="login" className='w-2/3 h-auto' />
    </div>
  </div>
  )
}

export default Register