import { register } from '../../services/api/auth/AuthApi';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        completeName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (event : any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            console.log("Passwords do not match");
            return;
        }

        try {
            register(formData)
            navigate('/auth/login');
        } catch (error) {
            console.error('Register error:', error);
        }
    };

    return (
        <div className='flex flex-col w-2/3 mx-auto'>
            <h1 className='text-white font-bold text-6xl text-left mb-7'>Register now</h1>
            <h2 className='text-white font-thin text-4xl text-left mb-7'>Hi, Welcome</h2>
            <form onSubmit={handleSubmit}>
                <div className='text-left mb-4 mt-2 text-white'>
                    <label htmlFor="completeName">complete Name :</label>
                </div>
                <div className='bg-[#E8505b] rounded-sm text-white '>
                    <input
                        className='bg-transparent outline-none rounded-xl p-4 w-full placeholder-[#20374B]'
                        type="text"
                        placeholder='Enter your complet Name'
                        id="completeName"
                        value={formData.completeName}
                        onChange={handleInputChange}
                        name="completeName"
                        required
                    />
                </div>
                <div className='text-left mb-4 mt-2 text-white'>
                    <label htmlFor="email">Email :</label>
                </div>
                <div className='bg-[#E8505b] rounded-sm text-white '>
                    <input
                        className='bg-transparent outline-none rounded-xl p-4 w-full placeholder-[#20374B]'
                        type="email"
                        placeholder='Enter your Email'
                        id="email"
                        value={formData.email}
                        name="email"
                        onChange={handleInputChange}
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
                        value={formData.password}
                        name="password"
                        onChange={handleInputChange}
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
                        value={formData.confirmPassword}
                        name="confirmPassword"
                        onChange={handleInputChange}
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
    );
};

export default RegisterForm;
