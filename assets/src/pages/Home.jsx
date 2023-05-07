// import dependencies
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// joy ui
import Button from '@mui/joy/Button';

// import material icons
import Science from '@mui/icons-material/Science';
import Payments from '@mui/icons-material/Payments';
import Draw from '@mui/icons-material/Draw';
import Desc from '@mui/icons-material/Description';
import Bulb from '@mui/icons-material/TipsAndUpdates';
import Send from '@mui/icons-material/Send';

const Home = () => {
    let navigate = useNavigate();
    return (
        <main className='blob-container'>
            <div
                className="text-gray-300 container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12"
            >

                <div className=" h-24 md:h-40"></div>
                <div>
                    <div className='blob'></div>
                    <p
                        className="text-4xl font-bold text-gray-200 max-w-5xl lg:text-7xl lg:pr-24 md:text-6xl"
                    >
                        Empowering the Future with ValiantAI
                    </p>
                    <div className="h-10"></div>
                    <p className="max-w-2xl text-xl text-gray-400 md:text-2xl">
                        What if dreams were more than just illusions of the mind? What if they were able to predict the future?
                    </p>
                </div>

                <div className=" h-24 md:h-40"></div>
                <div className="h-32 md:h-40"></div>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="flex flex-col justify-center">
                        <p
                            className="self-start inline text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-600"
                        >
                            The International Institute of Dreams presents:
                        </p>
                        <br />
                        <h2 className="neonText text-4xl font-bold">OrynixAI</h2>
                        <div className="h-6"></div>
                        <p className="font-serif text-xl text-gray-400 md:pr-10">
                            An advanced Artificial Intelligence that can analyse and decode users' dreams to predict the future.
                        </p>
                        <br />
                        <a onClick={() => { navigate("/dream/board") }} className=" cursor-pointer self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-green-600" >
                            Try OrynixAI
                        </a>
                        <div className="h-8"></div>
                        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-800">
                            <div>
                                <Science /> <p className="font-semibold underline text-gray-400">Revolutionary</p>
                                <div className="h-4"></div>
                                <p className="font-serif text-gray-400">
                                    Ability to harness the power of dreams and offer unique insights into the future..
                                </p>
                            </div>
                            <div>
                                <Payments />
                                <p className="font-semibold underline text-gray-400">Free to use</p>
                                <div className="h-4"></div>
                                <p className=" text-gray-400">
                                    Our commitment is to make this revolutionary technology accessible to everyone..
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-gray-900 to-black h-96"
                        ></div>
                    </div>
                </div>

                <div className="h-32 md:h-40"></div>

                <p className="text-4xl">
                    <span className="text-gray-400">Unlock the door to your dreams and embrace a future illuminated by OrynixAI's visionary insights.</span>

                    <span className="text-gray-600"
                    > Step into a world where dreams become the whispers of destiny, guiding your path with wisdom and foresight.</span>
                </p>

                <div className="h-32 md:h-40"></div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div
                        className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-br from-gray-900 to-black"
                    >
                        <p
                            className="flex items-center justify-center text-4xl text-green-600 font-bold bg-green-800 rounded-full shadow-lg w-14 h-14"
                        >
                            1
                        </p>
                        <div className="h-6"></div>
                        <p className="text-3xl"><Draw /> Register on our ValiantAI platform</p>
                    </div>
                    <div
                        className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-b from-gray-900 to-black"
                    >
                        <p
                            className="flex items-center justify-center text-4xl font-semibold text-indigo-400 bg-indigo-800 rounded-full shadow-lg w-14 h-14"
                        >
                            2
                        </p>
                        <div className="h-6"></div>
                        <p className="text-3xl">
                            <Desc /> Enter details of your dreams
                        </p>
                    </div>
                    <div
                        className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-bl from-gray-900 to-black"
                    >
                        <p
                            className="flex items-center justify-center text-4xl font-semibold text-teal-400 bg-teal-800 rounded-full shadow-lg w-14 h-14"
                        >
                            3
                        </p>
                        <div className="h-6"></div>
                        <p className="text-3xl"><Bulb /> Obtain insightful roadmaps</p>
                    </div>
                </div>

                <div className="h-40"></div>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="flex flex-col justify-center md:col-span-2">
                        <p
                            className="self-start inline text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-teal-600"
                        >
                            History in Mauritius shows that:
                        </p>
                        <h2 className="text-4xl font-bold">Dreams can predict the future!</h2>
                        <div className="h-6"></div>
                        <p className="font-serif text-xl text-gray-400 md:pr-10">
                            The Hindu priest had a dream where he saw a holy lake and 7 Angels (Pari's) which was connected to the sacred river Ganges in India. Later, his dream came true as he discovered the sacred Ganga Talao in Mauritius.
                        </p>
                        <div className="h-8"></div>
                        <div className="grid gap-6 pt-8 border-t border-gray-800 lg:grid-cols-3">
                            <div>
                                <p className="font-semibold text-gray-400">Dream Analysis</p>
                                <div className="h-4"></div>
                                <p className="font-serif text-gray-400">
                                    OrynixAI specialises in the analysis of dreams, decoding their intricate symbolism and extracting meaningful insights.
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-400">Future Predictions</p>
                                <div className="h-4"></div>
                                <p className="font-serif text-gray-400">
                                    With its advanced algorithms, OrynixAI excels at predicting future events based on the analysis of dreams.
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-400">Empowering Individuals</p>
                                <div className="h-4"></div>
                                <p className="font-serif text-gray-400">
                                    By unlocking the potential of dreams, OrynixAI empowers individuals in their lives and for their future.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="wrapper">
                            <div className="item">
                                <div className="polaroid"><img src={require('../images/pandit-giri-gossayne.png')} />
                                    <div className="caption text-black">Pandit Giri Gossayne</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="h-20 md:h-40"></div>
                <div className="h-10 md:h-20 border-t border-gray-800 ml-36 "></div>

                <div className="grid gap-8 md:grid-cols-2 ">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-4xl font-bold">The International Institute of Dreams </h2>
                        <div className="h-6"></div>
                        <p className="text-xl text-gray-400 md:pr-10">
                            The International Institute of Dreams is a renowned organization dedicated to the study and exploration of dreams. With a team of expert researchers and scientists, the institute delves into the profound mysteries of the dream realm, aiming to unlock its hidden potential and understand its significance in our lives.
                        </p>
                        <br />
                        <button onClick={() => { navigate("/about") }} className=" cursor-pointer self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-green-600" >
                            Learn More
                        </button>
                        <div className="h-8"></div>
                    </div>
                    <div>
                        <div
                            className="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-gray-900 to-black h-96"
                        ></div>
                    </div>
                </div>

                <div className="h-20 md:h-40"></div>
                <div className="h-10 md:h-20 border-t border-gray-800 ml-36 "></div>

                <div className=" text-center right text-white bg-blue-500 rounded p-16 font-bold text-2xl">
                    <p>If you are suffering from <span className=' text-red-800'>nightmares</span>, please contact our professionals: </p>
                    <br />
                    <a
                        href="mailto: valiantbusinesses@gmail.com"
                        className=" p-2 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-black"
                    >
                        Contact us  <Send />
                    </a>
                </div>

                <div className="h-12"></div>
            </div>
        </main>
    );
}

export default Home;