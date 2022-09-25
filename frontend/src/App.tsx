import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainNav from "./components/nav/MainNav";
import Auth from "./pages/Auth";
import NewPlace from "./pages/NewPlace";
import UpdatePlace from "./pages/UpdatePlace";
import UserPlaces from "./pages/UserPlaces";
import Users from "./pages/Users";
import AuthContext, { AuthContextModel } from "./store/AuthContext";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [uid, setUid] = React.useState("");

  const authContext: AuthContextModel = {
    isLoggedIn,
    uid,
    login: React.useCallback((uid: string) => {
      setIsLoggedIn(true);
      setUid(uid);
    }, []),
    logout: React.useCallback(() => {
      setIsLoggedIn(false);
      setUid("");
    }, []),
  };

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:uid/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:pid" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:uid/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={authContext}>
        <MainNav />
        <main className="mt-20">{routes}</main>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
