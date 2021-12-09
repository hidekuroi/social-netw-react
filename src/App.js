import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Route} from 'react-router-dom';

const  App = (props) => {
  
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header className='header'/>
        <Navbar dialogsData={props.state.messenger.dialogsData} className='navbar'/>        
        <div className='app-wrapper-content'>
          <Route path='/messages' render={ () => <Dialogs messengerData={props.state.messenger}
                                                          dispatch={props.dispatch}/> } />
          <Route path='/profile' render={ () => <Profile profileData={props.state.profile}
                                                         dispatch={props.dispatch}/> } />
          <Route path='/music' render={ () => <Music /> } />
          <Route path='/settings' render={ () => <Settings /> } />
        </div>
        <div className='footer'>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
