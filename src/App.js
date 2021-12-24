import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import { compose } from 'redux';
import { initializeApp } from './redux/appReducer';
import Loading from './components/common/Loading';
import Feed from './components/Feed/Feed';


class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }
  
  render() {
    if(!this.props.app.isInitialized){
      return <div className="spinner"><Loading  color={'darkcyan'}/></div>
    }
    else{
      return (
        <body className={this.props.app.darkTheme ? 'darkTheme' : null}>
        <div className="app-wrapper puk">
          <HeaderContainer className='header'/>
          <NavbarContainer className='navbar'/>        
          <div className='app-wrapper-content'>
            <Route path='/messages' render={ () => <DialogsContainer /> } />
            <Route path='/profile/:userId?' render={ () => <ProfileContainer /> } />
            <Route path='/feed' render={ () => <Feed />} />
            <Route path='/music' render={ () => <Music /> } />
            <Route path='/users' render={ () => <UsersContainer /> } />
            <Route path='/settings' render={ () => <Settings /> } />
            <Route path='/login' render={ () => <LoginContainer /> } />
          </div>
          <div className='footer'>
            <Footer />
          </div>
        </div>
      </body>
    );
    }
  }
}

let mapStateToProps = (state) => ({
    app: state.app
});


export default compose(
  withRouter,
  connect(mapStateToProps,{initializeApp})
)(App);
