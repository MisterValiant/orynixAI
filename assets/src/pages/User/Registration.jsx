// import dependencies
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        let valid = true;
        let message = '';

        // Registration validation
        // required fields cannot be blank
        if (username == '' || firstname == '' || lastname == '' || email == '' || password == '' || confirmPassword == '') {
            console.log('Required fields cannot be blank!')
            alert('Required fields cannot be blank!')
            valid = false
        }

        // check username
        if (valid == true) {
            const regex = /^(?=.{4,20}$)(?![.\s])(?!.*[_.]{2})[@_]?[a-zA-Z][a-zA-Z0-9_]*(?<![.\s])$/;

            if (!(username.match(regex))) {

                if (username.match(/^[0-9]/)) {
                    message = 'Username cannot start with a number';
                } else if (!username.match(/^([a-zA-Z@_])/)) {
                    message = 'Username cannot start with this special character';
                } else if ((username.length < 4)) {
                    message = 'Username length must be greater than 3';
                } else if ((username.length > 20)) {
                    message = 'Username length must be less than 20';
                } else {
                    message = 'Please enter a valid username!';
                }
                valid = false;
                console.log(message)
                alert(message)
            }
        }

        // check firstname
        if (valid == true) {
            const regex = /^(?=.{2,25}$)[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;

            if (!(firstname.match(regex))) {

                if (firstname.match(/\d/, firstname)) {
                    message = 'Firstname cannot contain numbers';
                } else if (firstname.match(/[^\w\s]/)) {
                    message = 'Firstname cannot contain special characters';
                } else if (firstname.match(/\s\s+/)) {
                    message = 'Remove consecutive spaces from firstname';
                } else if (((firstname.length) < 2)) {
                    message = 'Firstname length must be greater than 2';
                } else if (((firstname.length) > 25)) {
                    message = 'Firstname length must be less than 25';
                } else {
                    message = 'Please enter a valid firstname';
                }
                valid = false;
                console.log(message)
                alert(message)
            }
        }

        // check lastname
        if (valid == true) {
            const regex = /^(?=.{2,25}$)[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;

            if (!(lastname.match(regex))) {

                if (lastname.match(/\d/)) {
                    message = 'Lastname cannot contain numbers';
                } else if (lastname.match(/[^\w\s]/)) {
                    message = 'Lastname cannot contain special characters';
                } else if (lastname.match(/\s\s+/)) {
                    message = 'Remove consecutive spaces from firstname';
                } else if (((lastname.length) < 2)) {
                    message = 'Lastname length must be greater than 2';
                } else if (((lastname.length) > 25)) {
                    message = 'Lastname length must be less than 25';
                } else {
                    message = 'Please enter a valid lastname';
                }
                valid = false;
                console.log(message)
                alert(message)
            }
        }

        // check email
        if (valid == true) {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!(email.match(regex))) {

                if (!email.match(/@/)) {
                    message = 'An email should have the @ sign';
                } else {
                    message = 'Invalid email format';
                }
                valid = false;
                console.log(message)
                alert(message)
            }
        }

        // check phone
        if (valid == true) {
            if (!(phone == "" || phone == null)) {
                let regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

                if (!(phone.match(regex))) {
                    if (!phone.match(/\+/)) {
                        message = 'Country code is missing + sign';
                    } else {
                        message = 'Phone number has invalid format';
                    }
                    valid = false;
                    console.log(message)
                    alert(message)
                }
            }
        }

        // check password
        if (valid == true) {
            if (password != confirmPassword) {
                message = 'Password do not match!';
                valid = false;
                console.log(message)
                alert(message)
            } else {
                let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,20}$/;

                if (!(password.match(regex))) {
                    if ((password.length) < 8) {
                        message = 'Password length must be greater than 8';
                    } else if (password.length > 20) {
                        message = 'Password length must be less than 20';
                    } else if (!password.match(/[a-z]/)) {
                        message = 'Password must have at least one lowercase';
                    } else if (!password.match(/[A-Z]/)) {
                        message = 'Password must have at least one uppercase';
                    } else if (!password.match(/[!@#$%^&*()\-_=+{};:,<.>]/)) {
                        message = 'Password must contain at least one special character';
                    } else if (!password.match(/\d/)) {
                        message = 'Password must contain at least one number';
                    } else {
                        message = 'Password is invalid';
                    }
                    valid = false;
                    console.log(message)
                    alert(message)
                }
            }
        }

        // If valid send request to api
        if (valid == true) {
            axios.post('/api/user/register', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    phone: phone,
                    password: password
                },
            })
                .then(response => {
                    // clearInput();
                    const message = response.data.message;
                    console.log(response.data)
                    alert(message);
                    navigate("/login")
                })
                .catch(err => {
                    // clearInput();
                    console.log(JSON.parse(err.request.response).message);
                    alert(JSON.parse(err.request.response).message);
                });
        }
    }

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg mt-20">
                <h1 className="text-center text-2xl font-bold text-red-400 sm:text-3xl">
                    ValiantAI Account
                </h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                    Register your account
                </p>

                <div
                    className="mb-0  space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                >
                    {/* <p className="text-center text-lg font-medium">Sign in to your account</p> */}

                    <div>
                        {/* <h1>Registration Form</h1> */}
                        <br />
                        <label className="sr-only">Username:</label>
                        <div className="relative">
                            <input type="text" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" name="username" placeholder='Enter username' onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <br />

                        <label className="sr-only">Firstname:</label>
                        <div className="relative">
                            <input type="text" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" name="firstname" placeholder='Enter firstname' onChange={(e) => setFirstname(e.target.value)} />
                        </div>
                        <br />
                        <label className="sr-only">Lastname:</label>
                        <div className="relative">
                            <input type="text" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" name="lastname" placeholder='Enter lastname' onChange={(e) => setLastname(e.target.value)} />
                        </div>
                        <br />
                        <label className="sr-only">Email:</label>
                        <div className="relative">
                            <input type="text" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" name="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <br />
                        <label className="sr-only">Phone:</label>
                        <div className="relative">
                            <input type="text" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" name="phone" placeholder='Enter phone' onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <br />
                        <label className="sr-only">Password:</label>
                        <div className="relative">
                            <input type="password" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" name="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <br />
                        <label className="sr-only">Confirm password:</label>
                        <div className="relative">
                            <input type="password" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" name="confirm_password" placeholder='Confirm password' onChange={(e) => setConfirmPassword(e.target.value)} /><br />
                        </div>
                        <br />
                        <button onClick={handleSubmit}>Submit</button>
                    </div>


                    {/* <div>
                        <label className="sr-only">Username</label>

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
                    </div> */}

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

export default Registration;