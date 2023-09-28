// Login.js
import React, { useState } from 'react';
import axios from 'axios'; 
import {useNavigate} from "react-router-dom"; 

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailInUse, setEmailInUse] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/signup', {email, password})
    .then(res => {
        if(res.data.error){
            setEmailInUse(true)
            console.log("email already in use")
        }
        else{
            console.log("registered")
            navigate("/")
        }
    })
    .catch(err => console.log(err))
    };

    return (
        <div className="flex h-screen bg-black">
        <div className="m-auto">
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Sign-Up</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email:</label>
                <input
                type="email"
                id="email"
                className={`border rounded w-full py-2 px-3 ${
                    emailInUse ? "border-red-500" : "border-gray-300"}`}
                placeholder="Email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailInUse(false)
                }}
                required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password:</label>
                <input
                type="password"
                id="password"
                className="border rounded w-full py-2 px-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <div className="w-full">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                Login
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}

export default Signup;