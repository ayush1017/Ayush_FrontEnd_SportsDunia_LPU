import logo from './logo.svg';
import './App.css';
import {AnimatePresence} from 'framer-motion'
import { Route,Routes, useNavigate } from 'react-router-dom';
import {Login,Home,Payout, Analytics} from './components'
import { getAuth } from 'firebase/auth'
import { app } from './firebase/firebase.config'
import { useEffect, useState } from 'react';
import { SearchProvider } from './components/context';


function App() {
  const firebaseAuth=getAuth(app);
  const navigate=useNavigate();
  const [auth,setauth]=useState(false||window.localStorage.getItem("auth")==="true");
  useEffect(()=>{
    firebaseAuth.onAuthStateChanged((user)=>{
      if(user){
        navigate('/Home',{replace: true})
      }else{
        setauth(false);
        window.localStorage.setItem("auth","false");
        navigate('/login')
      }
    })
    
  },[])
  return (
    <div>
      <AnimatePresence mode="wait">
        <SearchProvider>
        <Routes>
          <Route path="/login" element={<Login setAuth={setauth}/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Payouts" element={<Payout/>}/>
          <Route path="/NewsAnalytics" element={<Analytics/>}/>
        </Routes>
        </SearchProvider>
       

      </AnimatePresence>
    </div>
  );
}

export default App;
