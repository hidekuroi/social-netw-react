import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Route} from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';

const  App = (props) => {
  
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer className='header'/>
        <NavbarContainer className='navbar'/>        
        <div className='app-wrapper-content'>
          <Route path='/messages' render={ () => <DialogsContainer /> } />
          <Route path='/profile/:userId?' render={ () => <ProfileContainer /> } />
          <Route path='/music' render={ () => <Music /> } />
          <Route path='/users' render={ () => <UsersContainer /> } />
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
