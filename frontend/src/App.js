import { useState, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (loggedIn) history.push("/");
    else history.push("/login");
  }, [loggedIn]);
  return (
    <>
      <Navbar loggedIn={loggedIn} logout={() => setLoggedIn(false)} />
      <Route exact path="/">
        {loggedIn ? <Home /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/login">
        {!loggedIn ? (
          <Login login={() => setLoggedIn(true)} />
        ) : (
          <Redirect to="/" />
        )}
      </Route>
      {!loggedIn ? <Register /> : <Redirect to="/" />}
    </>
  );
}
