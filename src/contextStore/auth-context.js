import React, {useState} from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (em, pw) => {},
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const loginHandler = (email, password) => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    };
    const logoutHandler = () => {
        setIsLoggedIn(false);
    };
    return <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler}}>
        {props.children };
    </AuthContext.Provider>
}

export default AuthContext;