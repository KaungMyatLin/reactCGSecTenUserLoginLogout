import React, {useContext} from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./contextStore/auth-context";

function App() {
  const conxHk_AuConxObj = useContext(AuthContext);
  return (
    <React.Fragment>
      {/* <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler}}></AuthContext.Provider> */}
      <MainHeader //isAuthenticated={isLoggedIn}
      // onLogout={logoutHandler}
      />
        <main>
          {!conxHk_AuConxObj.isLoggedIn && <Login // onLogin={loginHandler}
          />}
          {conxHk_AuConxObj.isLoggedIn && <Home // onLogout={logoutHandler}
          />}
        </main>
    </React.Fragment>
  );
}

export default App;
