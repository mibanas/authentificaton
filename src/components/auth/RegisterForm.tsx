import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSubmit = (e : any) => {
      e.preventDefault();
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);
  };

  return (
    <div className='flex flex-col w-2/3 mx-auto'>
        <h1 className='text-white font-bold text-6xl text-left mb-7'>Register now</h1>
        <h2 className='text-white font-thin text-4xl text-left mb-7'>Hi, Welcome</h2>
        <form onSubmit={handleSubmit}>
            <div className='text-left mb-4 mt-2 text-white'>
                <label htmlFor="email">Email :</label>
            </div>
            <div className='bg-[#E8505b] rounded-sm text-white '>
                <input 
                    className='bg-transparent outline-none rounded-xl p-4 w-full placeholder-[#20374B]'
                    type="email"
                    placeholder='Enter your Email'
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className='text-left mb-4 mt-4 text-white'>
                <label htmlFor="password">Password :</label>
            </div>
            <div className='bg-[#E8505b] rounded-sm  text-white'>
                <input 
                    className='bg-transparent outline-none rounded-xl p-4 w-full placeholder-[#20374B]'
                    type="password"
                    placeholder='Enter your Password'
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className='text-left mb-4 mt-4 text-white'>
                <label htmlFor="confirmPassword">Confirm Password :</label>
            </div>
            <div className='bg-[#E8505b] rounded-sm  text-white'>
                <input 
                    className='bg-transparent outline-none rounded-xl p-4 w-full placeholder-[#20374B]'
                    type="password"
                    placeholder='Confirm your Password'
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <div className='bg-[#ffffff] rounded-sm mt-20 text-white'>
                <button className='mt-5 mb-5 text-[#20374B] font-medium' type="submit">Register</button>
            </div>
            <p className="text-white mt-4 text-left">
                If you have an account, <Link to="/auth/login" className="text-[#E8505b] font-bold hover:text-[#f1969d]">Login</Link>.
            </p>
            <p className="text-white mt-4 text-left">
                Go, <Link to="/" className="text-[#E8505b] font-bold hover:text-[#f1969d]">To home</Link>.
            </p>
        </form>
    </div>

  )
}

export default RegisterForm