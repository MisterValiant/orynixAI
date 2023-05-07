// import dependencies
import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';


// import templates
import Header from './templates/Header'
import Footer from './templates/Footer'

// import components
import App from './App'
import { AuthProvider } from './context/AuthProvider';

if (document.getElementById('root')) {
    const root = ReactDOM.createRoot(
        document.getElementById('root')
    );
    root.render(
        <BrowserRouter>
            <React.StrictMode>
                <AuthProvider>
                    <Header />
                    <App />
                    <Footer />
                </AuthProvider>
            </React.StrictMode>
        </BrowserRouter>
    );
}