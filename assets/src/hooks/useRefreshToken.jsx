import { useContext, useEffect, useRef } from 'react';
import axios from '../api/axios';
import { AuthProvider } from '../context/AuthProvider';
import useAuth from './useAuth';

const useRefreshToken = () => {

    const effectRan = useRef(false);

    const { setAuth } = useAuth();

    const token = localStorage.getItem("access_token");
    useEffect(() => {
        if (effectRan.current === false) {
            
            axios.post('/api/auth/token', {
                headers: {
                    'content-type': 'application/json'
                },
                data: {
                    Authorization: "Bearer " + token
                }
            })
                .then(response => {
                    const accessToken = response?.data?.data?.token;
                    const roles = response?.data?.data?.roles;
                    const message = response?.data?.message;
                    console.log(message)
                    setAuth({ roles, accessToken });
                    if (accessToken != null) {
                        localStorage.setItem("access_token", accessToken);
                    }
                })
                .catch(err => {
                    setAuth({});
                    console.log(JSON.parse(err.request.response).message);
                });
        }

        //cleanup function
        return () => {
            effectRan.current = true  // this will be set to true on the initial unmount
        }
    }, [])
};

export default useRefreshToken;