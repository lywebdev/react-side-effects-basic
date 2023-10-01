import React, {useEffect, useState} from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedLoggedInfo = localStorage.getItem('isLoggedIn');

        if (storedLoggedInfo === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const loginHandler = (email, password) => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        setIsLoggedIn(false);
    };

    return (<React.Fragment>
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
        }}>
            <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler}/>
            <main>
                {!isLoggedIn && <Login onLogin={loginHandler}/>}
                {isLoggedIn && <Home onLogout={logoutHandler}/>}
            </main>
        </AuthContext.Provider>
    </React.Fragment>);
}

export default App;
