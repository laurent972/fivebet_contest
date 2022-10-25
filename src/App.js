import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Profil from './Pages/Profil';
import LeaderBoard from './Pages/LeaderBoard';
import './styles/index.scss';
import ParticipantRegister from "./Pages/ParticipantRegister";
import AddContestant from "./Pages/AddContestant";
import { LoginContext } from "./service/context";
import { useEffect, useMemo, useState } from "react";

import Notfound from "./Pages/Notfound";
import PrivateRoute from "./components/PrivateRoute";


function App() {

  const [loggedIn,setLoggedIn] = useState(null);
  const value = useMemo(()=>({loggedIn,setLoggedIn}), [loggedIn,setLoggedIn]);
 
  useEffect(()=>{
    if(localStorage.getItem('auth') !== null){
      setLoggedIn(true)
    }
  },[])

  return (
    <div className="App content-global">
      <div className="container postion-relative">
      <LoginContext.Provider value={value}>
          <Routes>
                   <Route path="/" element={<Home />} />
                    <Route path="/leaderboard" element={<LeaderBoard />} />
                    <Route path="/" element={<PrivateRoute />}>
                      <Route path="/profil/:id" element={<Profil />} />
                      <Route path="/contestants" element={<ParticipantRegister />} />
                      <Route path="/add-contestant" element={<AddContestant /> }/>
                    </Route>
                    <Route path="*" element={<Notfound />}/> 
          </Routes>
        </LoginContext.Provider>
      </div>
    </div>
  );
}

export default App;
