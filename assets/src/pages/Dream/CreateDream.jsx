// import dependencies
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateDream = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [sleep_time, setSleepTime] = useState('');
    const [wake_time, setWakeTime] = useState('');
    const [dream_type, setDreamType] = useState('Dream');
    const [setting, setSetting] = useState('');
    const [emotion, setEmotion] = useState('');
    const [vividness, setVividness] = useState('');
    const [description, setDescription] = useState('');
    const [highlights, setHighlights] = useState('');
    const [characters, setCharacters] = useState('');

    const handleSubmit = (e) => {
        let valid = true;
        let sleepDate = '';
        let wakeDate = '';

        // validation
        if (title == '' || dream_type == '' || setting == '' || emotion == '' || vividness == '' || description == '' || highlights == '' || characters == '') {
            console.log('Required fields cannot be blank!')
            alert('Required fields cannot be blank!')
            valid = false
        }

        try {
            if (valid == true) {
                if (new Date(wake_time) > new Date(sleep_time)) {
                    valid = true;
                } else {
                    valid = false;
                    console.log('Wake time cannot be greater than sleep time!')
                    alert('Wake time cannot be greater than sleep time!')
                }
            }

            if (valid == true) {
                if (new Date(sleep_time) > new Date()) {
                    valid = false;
                    console.log('Sleep time cannot be greater than today!')
                    alert('Sleep time cannot be greater than today!')
                } else if (new Date(wake_time) > new Date()) {
                    valid = false;
                    console.log('Wake time cannot be greater than today!')
                    alert('Wake time cannot be greater than today!')
                }
            }

            if (valid == true) {
                const sleepDate = new Date(sleep_time)
                const wakeDate = new Date(wake_time)

                if ((Math.floor(wakeDate.getTime() / 60000) - Math.floor(sleepDate.getTime() / 60000)) < 10) {
                    valid = false;
                    console.log('Science shows that it requires at least a 10min nap to dream!')
                    alert('Science shows that it requires at least a 10min nap to dream!')
                }
            }

            if (!(sleep_time == '' || wake_time == '')) {
                sleepDate = new Date(sleep_time).toISOString().slice(0, 19).replace('T', ' ');
                wakeDate = new Date(wake_time).toISOString().slice(0, 19).replace('T', ' ');
            }
        } catch (e) {
            console.log('Datetime tampered!')
            alert('Datetime tampered!')
        }

        if (valid == true) {
            axios.post('/api/dream/insert', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    title: title,
                    sleep_time: sleepDate,
                    wake_time: wakeDate,
                    dream_type: dream_type,
                    setting: setting,
                    emotion: emotion,
                    vividness: vividness,
                    description: description,
                    highlights: highlights,
                    characters: characters,
                },
            })
                .then(response => {
                    // clearInput();
                    const message = response.data.message;
                    console.log(response.data)
                    alert(message);
                    navigate("/dream/board")
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
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                    Add your dream
                </h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                    Capture your dream and Orynix will perform predictions
                </p>


                <div
                    className="mb-0  space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                >
                    <br />

                    <label className="sr-only text-white">Title:</label>
                    <div className="relative">
                        <input type="text" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" name="title" placeholder='Enter title' onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <br />
                    <label className="sr-only text-white">Sleep time:</label>
                    <div className="relative">
                        <input className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" type="datetime-local" name="sleep_time" placeholder='Enter sleep time' onChange={(e) => setSleepTime(e.target.value)} />
                    </div>
                    <br />
                    <label className="sr-only text-white">Wake time:</label>
                    <div className="relative">
                        <input className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" type="datetime-local" name="wake_time" placeholder='Enter wake time' onChange={(e) => setWakeTime(e.target.value)} />
                    </div>
                    <br />
                    <label className="sr-only text-white">Setting:</label>
                    <div className="relative">
                        <textarea className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" type="text" name="setting" placeholder='Enter setting' onChange={(e) => setSetting(e.target.value)} />
                    </div>
                    <br />
                    <label className="sr-only text-white">Emotion:</label>
                    <div className="relative">
                        <textarea className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" type="text" name="emotion" placeholder='Enter emotion' onChange={(e) => setEmotion(e.target.value)} />
                    </div>
                    <br />
                    <label className="sr-only text-white">Vividness:</label>
                    <div className="relative">
                        <input className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" type="text" name="vividness" placeholder='Enter vividness' onChange={(e) => setVividness(e.target.value)} />
                    </div>
                    <br />
                    <label className="sr-only text-white">Dream Description:</label>
                    <div className="relative">
                        <textarea className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" type="text" name="setting" placeholder='Enter description' onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <br />
                    <label className="sr-only text-white">Highlights:</label>
                    <div className="relative">
                        <textarea className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" type="textarea" name="setting" placeholder='Enter highlights' onChange={(e) => setHighlights(e.target.value)} />
                    </div>
                    <br />
                    <label className="sr-only text-white">Characters:</label>
                    <div className="relative">
                        <textarea className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" type="text" name="setting" placeholder='Enter characters' onChange={(e) => setCharacters(e.target.value)} />
                    </div>
                    <br />
                    <button className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white" onClick={handleSubmit}>Submit</button>
                    <br/>
                    <p className='text-white text-center'>Please wait for some time after submission for Onyrix to process your dream 😉</p>
                </div>
            </div>
        </div>

    );
}

export default CreateDream;