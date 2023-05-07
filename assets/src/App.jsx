// import dependencies
import React, { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import pages
import Front from "./pages/Front";
import Home from "./pages/Home";
import ProtectedHome from "./pages/ProtectedHome";
import Login from "./pages/User/Login";
import Registration from './pages/User/Registration';
import Unauthorized from './pages/Unauthorised';
import OnlyEditor from './pages/OnlyEditor';
import CreateDream from './pages/Dream/CreateDream';
import About from './pages/Institution';
import Dreamboard from './pages/Dream/Dreamboard';

// import components
import RequireAuth from './components/RequireAuth';

//import hooks
import useRefreshToken from './hooks/useRefreshToken';
import useAuth from './hooks/useAuth';

function App() {

    useEffect(() => {

    }, [useRefreshToken()])

    return (

        <Routes>
            {/* Public access */}
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/unauthorised" element={<Unauthorized />} />

            <Route path="/about" element={<About />} />

            {/* Protected routes */}
            <Route element={<RequireAuth allowedRoles={["ROLE_USER"]} />}>
                <Route path="/protected" element={<ProtectedHome />} />
                <Route path="/dream/create" element={<CreateDream />} />
                <Route path="/dream/board" element={<Dreamboard />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["ROLE_EDITOR"]} />}>
                <Route path="/editor" element={<OnlyEditor />} />
            </Route>

            {/* Catch all */}
        </Routes>

    );
}

export default App;