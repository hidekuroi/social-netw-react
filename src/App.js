import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Route} from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';

const  App = (props) => {
  
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header className='header'/>
        <NavbarContainer className='navbar'/>        
        <div className='app-wrapper-content'>
          <Route path='/messages' render={ () => <DialogsContainer /> } />
          <Route path='/profile' render={ () => <Profile /> } />
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
