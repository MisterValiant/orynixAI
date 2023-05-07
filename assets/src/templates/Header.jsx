// import dependencies
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const Header = () => {
    let navigate = useNavigate();
    const { setAuth } = useAuth();

    function logout() {
        axios.post('/api/auth/logout', {
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(response => {
                const message = response?.data?.message;
                console.log(message)
                alert(message)
                localStorage.removeItem("refresh_token");
                setAuth({});
                document.querySelector('#sign_in').style.display = 'inherit';
                document.querySelector('#sign_out').style.display = 'inherit';
                document.querySelector('#logout').style.display = 'none';
                document.querySelector('#createDream').style.display = 'none';
                document.querySelector('#dreamBoard').style.display = 'none';
            })
            .catch(err => {
                setAuth({});
                console.log(JSON.parse(err.request.response).message);
            });
    }

    //Navbar
    useEffect(() => {
        document.getElementById('nav-toggle').onclick = function () {
            document.getElementById("nav-content").classList.toggle("hidden");
        }

        const access_token = localStorage.getItem("access_token");

        if (!(access_token == '' || access_token == null)) {
            document.querySelector('#sign_in').style.display = 'none';
            document.querySelector('#sign_out').style.display = 'none';
            document.querySelector('#logout').style.display = 'inherit';
            document.querySelector('#createDream').style.display = 'inherit';
            document.querySelector('#dreamBoard').style.display = 'inherit';
        } else {
            document.querySelector('#sign_in').style.display = 'inherit';
            document.querySelector('#sign_out').style.display = 'inherit';
            document.querySelector('#logout').style.display = 'none';
            document.querySelector('#createDream').style.display = 'none';
            document.querySelector('#dreamBoard').style.display = 'none';
        }

        var prevScrollpos = window.pageYOffset;
        window.onscroll = function () {
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                document.getElementById("navbar").style.top = "0";
            } else {
                document.getElementById("navbar").style.top = "-100px";
            }
            prevScrollpos = currentScrollPos;
        }
    }, [])

    return (
        <header>
            <div className="bg-gray-700 font-sans leading-normal tracking-normal">

                <nav id='navbar' className=" transition-all flex items-center justify-between flex-wrap bg-gray-800 p-6 fixed w-full z-10 top-0">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <img onClick={() => { navigate("/") }} className='w-10 mr-2' src={require('../images/logo/val-logo.png')} />
                        <a onClick={() => { navigate("/") }} className="text-white no-underline hover:text-white hover:no-underline">
                            <span className="text-2xl pl-2"><i className="em em-grinning"></i> ValiantAI</span>
                        </a>
                    </div>

                    <div className="block lg:hidden">
                        <button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                        </button>
                    </div>

                    <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0" id="nav-content">
                        <ul className="list-reset lg:flex justify-end flex-1 items-center">
                            <li className="mr-3">
                                <button className="inline-block py-2 px-4 text-white no-underline" onClick={() => { navigate("/") }}>Home</button>
                            </li>
                            <li className="mr-3">
                                <button className="inline-block py-2 px-4 text-white no-underline" onClick={() => { navigate("/about") }}>About</button>
                            </li>
                            <li id='createDream' className="mr-3">
                                <button className="inline-block py-2 px-4 text-white no-underline" onClick={() => { navigate("/dream/create") }}>Create Dream</button>
                            </li>
                            <li id='dreamBoard' className="mr-3">
                                <button className="inline-block py-2 px-4 text-white no-underline" onClick={() => { navigate("/dream/board") }}>Dreamboard</button>
                            </li>
                            <li className="mr-3">
                                <button
                                    id='sign_in'
                                    onClick={() => { navigate("/login") }}
                                    className="self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black"
                                >
                                    Sign In
                                </button>
                            </li>
                            <li className="mr-3">
                                <button
                                    id='sign_out'
                                    onClick={() => { navigate("/register") }}
                                    className="self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black"
                                >
                                    Sign Up
                                </button>
                            </li>
                            <li className="mr-3">
                                <button
                                    id='logout'
                                    onClick={logout}
                                    className="self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            {/* <button type="button" onClick={() => { navigate("/") }}>
                Home
            </button>
            <button type="button" onClick={() => { navigate("/login") }}>
                Login
            </button>
            <button type="button" onClick={() => { navigate("/register") }}>
                Registration
            </button>
            <button type="button" onClick={() => { navigate("/home") }}>
                Protected Home
            </button>
            <button type="button" onClick={() => { navigate("/editor") }}>
                Editor
            </button>
            <button type="button" onClick={logout}>
                Logout
            </button> */}
        </header>
    );
}

export default Header;