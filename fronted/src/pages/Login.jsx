// import React from 'react'
// import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import * as yup from 'yup'
// import TextInput from '../components/TextInput'
// import { Link, useNavigate } from 'react-router-dom'

// const schema = yup.object({
// email: yup.string().email('Enter a valid email').required('Email is required'),
// password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
// }).required()

// export default function Login(){
//     const navigate = useNavigate()
//     const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
//     resolver: yupResolver(schema),
//     })

//     const onSubmit = async (data) => {
//     // replace with your API call
//     console.log('Login data', data)
//     // Example: fake delay to simulate login
//     await new Promise(r => setTimeout(r, 700))
//     // On success navigate or set auth state
//     alert('Logged in (demo) — check console')
//     navigate('/')
//     }

//     return (
//         <div className="app-bg flex items-center justify-center mt-70">
//             <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-bold mb-4">Login</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <TextInput label="Email" type="email" {...register('email')} error={errors.email?.message} />
//             <TextInput label="Password" type="password" {...register('password')} error={errors.password?.message} />

//             <div className="flex items-center justify-between">
//             <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60">
//             {isSubmitting ? 'Signing in...' : 'Sign in'}
//             </button>
//             <Link to="/signup" className="text-sm text-gray-600">Create account</Link>
//             </div>
//             </form>
//             </div>
//         </div>
//     )
// }

import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log("Login response:", data);
    } catch (error) {
        console.error("Login error:", error);
    } finally {
        setFormData({ email: "", password: "" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-70">
      <div className="flex flex-col gap-y-10 justify-center items-center">
         <h2 className="text-2xl font-bold mb-4 underline ">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="mr-2 text-gray-700" htmlFor="email">Email:</label>
            <input className="border-2 rounded-md "
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="mr-2 text-gray-700" htmlFor="password">Password:</label>
            <input className="border-2 rounded-md"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button className=" cursor-pointer mt-3 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60" type="submit">Login</button>
        </form>
      </div>
    
     
    </div>
  );
};

export default Login;
