// import dependencies
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// import material icons
import Science from '@mui/icons-material/Science';
import Payments from '@mui/icons-material/Payments';

const Institution = () => {
    return (
        <main className='blob-container'>
            <div
                className="text-gray-300 container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12"
            >

                <div className=" h-24 md:h-40"></div>
                <div className='blob2'></div>
                <div>
                    <p
                        className="text-4xl font-bold text-gray-200 max-w-5xl lg:text-7xl lg:pr-24 md:text-6xl"
                    >
                        The International Institute of Dreams
                    </p>
                    <div className="h-10"></div>
                    <p className="max-w-2xl text-xl text-gray-400 md:text-2xl">
                    The International Institute of Dreams is a prestigious organization dedicated to the study, research, and exploration of dreams. Comprised of esteemed experts and researchers in the field, the institute seeks to unravel the profound mysteries and potential hidden within the realm of dreams.
                    </p>
                </div>

                <div className="h-32 md:h-40"></div>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="flex flex-col justify-center">
                        <p
                            className="self-start inline text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-600"
                        >
                            Today, TIID wants to go to infinity and beyond the:
                        </p>
                        <br />
                        <h2 className="neonText text-4xl font-bold">Future</h2>
                        <div className="h-6"></div>
                        <p className="font-serif text-xl text-gray-400 md:pr-10">
                            In partnership with ValiantAI, TIID wants to offer the public the ability to take their future in hand with their revolutionary technologies.
                        </p>
                        <br />
                        <div className="h-8"></div>
                        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-800">
                            <div>
                                <Science /> <p className="font-semibold underline text-gray-400">Revolutionary</p>
                                <div className="h-4"></div>
                                <p className="font-serif text-gray-400">
                                    Ability to harness the power of different technologies and offer unique solutions..
                                </p>
                            </div>
                            <div>
                                <Payments />
                                <p className="font-semibold underline text-gray-400">Free to use</p>
                                <div className="h-4"></div>
                                <p className=" text-gray-400">
                                    Our commitment is to make our revolutionary technology accessible to everyone..
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
                    <span className="text-gray-400">The International Institute of Dreams:</span>

                    <span className="text-gray-600"
                    > Unveiling the Secrets of the Dream Realm, Illuminating Paths to Self-Discovery.</span>
                </p>

                <div className="h-12"></div>
            </div>
        </main>
    );
}

export default Institution;