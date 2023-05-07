// import dependencies
import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom'

const UserDashnboard = () => {
    const [dreams, setDreams] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        dreamData();
    }, []);


    const dreamData = async () => {
        const { data } = await axios.post('/api/dream/read');
        data.reverse();
        data.sort();
        setDreams(data);
        console.log(data)
    };

    return (
        <div>
            <div className=" h-24 md:h-40"></div>
            <button onClick={() => { navigate("/dream/create") }} className=" ml-28 cursor-pointer self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-green-600" >
                Add a new dream
            </button>
            <div className="min-h-screen flex flex-col justify-center relative overflow-hidden sm:py-12">
                <div className="dreams">
                    {dreams.map((dream, index) => (
                        <div className="max-w-7xl mx-auto mt-5">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                                    <div className="space-y-2">
                                        <p className="text-slate-800">Title: {dream.title}</p>
                                        <p className="text-slate-800">Emotion: {dream.emotion}</p>
                                        <p className="text-slate-800">Highlights: {dream.highlights}</p>
                                        <p className="text-slate-800">Roadmap:</p>
                                        <p className="text-slate-800">{dream.roadmap}</p>
                                        <br />
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </div>
        // <div className="dreams">
        //     {dreams.map((dream, index) => (
        //         <div key={index}>
        //             <h5>{dream.setting}</h5>
        //         </div>
        //     ))}
        // </div>
    );
}

export default UserDashnboard;