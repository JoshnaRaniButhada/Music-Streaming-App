import './output.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginComponent from './routes/Login';
import SignUpComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import SearchPage from './routes/SearchPage';
import Library from './routes/Library';
import MyMusic from './routes/MyMusic';
import SinglePlaylistView from './routes/SinglePlaylistView';
import UploadSong from './routes/UploadSong';
import TuneBud_logo from "./assets/images/TuneBud_logo.png"


import LoggedInHomeComponent from './routes/LoggedInHome';
import { useCookies } from 'react-cookie';
import songContext from './contexts/songContext';


function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null)
  const [isPaused, setIsPaused] = useState(true);
  const [cookie, setCookie] = useCookies(["token"]);

 const handleLogin = (token) => {
    // Set the token cookie
    setCookie("token", token, { path: "/" });
  };

  return (
    <div className='w-screen h-screen font-poppins'>
    <BrowserRouter>
        {cookie.token ? (
          //logged in routes
          <songContext.Provider value={{
              currentSong, 
              setCurrentSong, 
              soundPlayed, 
              setSoundPlayed, 
              isPaused, 
              setIsPaused
            }}
          >
            
            <Routes>
              
                <Route path="/" element={
                  
                  
                  <div className= "flex flex-col" style={{ backgroundColor: '#14051E', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                     <Link 
                        to="/home" 
                         className="text-xl" 
                          style={{  
                            fontWeight: 'bold', 
                            fontStyle: 'italic',
                            transition: 'color 0.3s', 
                            textDecoration: 'underline',  
                          }}
                      // Hover effect to change color
                      onMouseEnter={(e) => e.target.style.color = '#907DB3'}
                      onMouseLeave={(e) => e.target.style.color = '#D6C7F4'} 
                       >
                        Go to home
                    </Link>
                    <img
                      src={TuneBud_logo}
                      alt="TuneBud"
                      style={{ height: '80vh', width: '80vh' }} 
                    />
                    <div className='text-white text-3xl font-semibold'>Tune in, Tune out!</div>
                  </div>
                
                } />
                <Route path="/home" element = {<LoggedInHomeComponent />} />
                <Route path="/uploadsong" element = {<UploadSong />} />
                <Route path="/myMusic" element = {<MyMusic />} />
                <Route path="/search" element = {<SearchPage />} />
                <Route path="/library" element = {<Library />} />
                <Route path="/playlist/:playlistId" element = {<SinglePlaylistView />} />
                <Route path="*" element = {<Navigate to="/home" />} />
              
            </Routes>
          </songContext.Provider>
      ) : (
    
        //logged out routes
          <Routes>
            <Route path="/home" element = {<HomeComponent />} />  
            <Route path="/login" element = {<LoginComponent onLogin={handleLogin}/>} />
            <Route path="/signUp" element = {<SignUpComponent />} />   
            <Route path="*" element = {<Navigate to="/login" />} />
          </Routes>
    )} 

    </BrowserRouter>
    </div>
  );
}

export default App;



