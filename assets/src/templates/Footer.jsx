// import dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom';


// import material icons
import Share from '@mui/icons-material/Share';
import Link from '@mui/icons-material/Link';
import { Apartment } from '@mui/icons-material';

const Footer = () => {
    let navigate = useNavigate();
    return (
        <footer className=' text-white border-t border-gray-800 ml-36  mr-36'>
            <div className="h-2 md:h-20"></div>
            <div className="grid gap-4 md:grid-cols-4">
                <ul className="space-y-1 text-gray-400">
                    <Share />
                    <li className=" text-xl underline pb-4 text-gray-400">Social networks</li>
                    <li>
                        <a href="https://twitter.com/victormustar" className="hover:underline"
                        >Twitter</a
                        >
                    </li>
                    <li>
                        <a href="https://www.linkedin.com" className="hover:underline">Linkedin</a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com" className="hover:underline">Facebook</a>
                    </li>
                </ul>

                <ul className="space-y-1 text-gray-400">
                    <Apartment />
                    <li className="pb-4 text-xl underline text-gray-400">Organisations</li>
                    <li>
                        <a href="https://24h.webcup.fr" className="hover:underline">24 heures By Webcup</a>
                    </li>
                    <li>
                        <a href="https://hodi.host" className="hover:underline">Hodi.host</a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/WebCupMaurice" className="hover:underline">Webcup Maurice</a>
                    </li>
                </ul>

                <ul className="space-y-1 text-gray-400">
                    <Link />
                    <li className="pb-4 text-xl underline text-gray-400">Links</li>
                    <li>
                        <a onClick={() => { navigate("/about") }} className="hover:underline cursor-pointer">The International Dreams Institute</a>
                    </li>
                    <li>
                        <a onClick={() => { navigate("/") }} className="hover:underline cursor-pointer">Home</a>
                    </li>
                    <li>
                        <a onClick={() => { navigate("/login") }} className="hover:underline cursor-pointer">Login</a>
                    </li>
                    <li>
                        <a onClick={() => { navigate("/register") }} className="hover:underline cursor-pointer">Registration</a>
                    </li>
                </ul>

                <ul className="space-y-1 text-gray-400">
                    <li className="pb-4 text-gray-400">Our flagship product:</li>
                    <li>
                        <a
                            title='OrynixAI'
                            onClick={() => { navigate("/dreamboard") }}
                            className="self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black"
                        >
                            Try OrynixAI
                        </a>
                    </li>
                </ul>
            </div>
            <br />
            <div className="h-2 md:h-10"></div>
            <div className=' text-center p-8'>
                Made with ❤️ by Team Valiant © 2023
            </div>
        </footer>
    );
}

export default Footer;