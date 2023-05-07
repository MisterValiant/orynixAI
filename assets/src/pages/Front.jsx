// import dependencies
import React, { useEffect } from 'react';

// import from joy ui
import CircularProgress from '@mui/joy/CircularProgress';

// import material icons
import Wave from '@mui/icons-material/WavingHand';

const Front = () => {

    useEffect(() => {
        document.querySelector('header').style.visibility = 'hidden';
        document.querySelector('footer').style.visibility = 'hidden';
    }, [])

    return (
        <main className='bg-slate-800 text-white'>
            <br />
            <h1 className=' text-white'><Wave className=' text-red-400' /> Hello from <i className=' text-red-400 font-bold'>Team Valiant</i></h1>
            <br />
            <h2>Work in Progress!</h2>
            <br />
            <CircularProgress />
            <br />
            <br />
        </main>
    );
}

export default Front;