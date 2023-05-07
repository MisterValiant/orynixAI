// import dependencies
import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom'

const LoginForm = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Login validation
        if (username == '' || password == '') {
            console.log('Input fields cannot be blank!');
            alert('Input fields cannot be blank!');
        } else {

            axios.post('/api/auth/login', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username: username,
                    password: password,
                }
            })
                .then(response => {
                    console.log(response.data);
                    alert(response?.data?.message)
                    const accessToken = response?.data?.data?.token;
                    const roles = response?.data?.data?.roles;
                    setAuth({ roles });
                    localStorage.setItem("access_token", accessToken);
                    localStorage.setItem("roles", roles);
                    // navigate(from, { replace: true });
                    clearInput();
                    document.querySelector('#sign_in').style.display = 'none';
                    document.querySelector('#sign_out').style.display = 'none';
                    document.querySelector('#logout').style.display = 'inherit';
                    document.querySelector('#createDream').style.display = 'inherit';
                    document.querySelector('#dreamBoard').style.display = 'inherit';
                    navigate("/dream/board")
                })
                .catch(err => {
                    clearInput();
                    setAuth({});
                    console.log(JSON.parse(err.request.response).message);
                    alert(JSON.parse(err.request.response).message);
                });
        }
    }

    function clearInput() {
        setUsername('');
        setPassword('');
        document.querySelector('#username').value = ''
        document.querySelector('#password').value = ''
    }

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg mt-20">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                    ValiantAI Account
                </h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                    Sign in to your account
                </p>

                <div
                    className="mb-0  space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                >
                    {/* <p className="text-center text-lg font-medium">Sign in to your account</p> */}

                    <div>
                        <label className="sr-only text-white">Username</label>

                        <div className="relative">
                            <input id='username'
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter username"
                                onChange={(e) => setUsername(e.target.value)}
                            />


                        </div>
                    </div>

                    <div>
                        <label className="sr-only">Password</label>

                        <div className="relative">
                            <input id='password'
                                type="password"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />


                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;