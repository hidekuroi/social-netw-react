import React, {useEffect, Suspense, lazy} from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import { compose } from 'redux';
import { initializeApp } from './redux/appReducer';
import Loading from './components/common/Loading';
import Feed from './components/Feed/Feed';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));


const App = (props) => {

  useEffect(() => {
    const errorCaught = (reason, promise) => {
      console.log('reason');
      console.log(reason);
    }
    function subscribeErrorsHandler() {
      window.addEventListener('unhandledrejection', errorCaught);
    }
    subscribeErrorsHandler();
    
    if(!props.app.isInitialized){
      props.initializeApp();
    }    
    return function unsubscribeErrorsHandler(){
      window.removeEventListener('unhandledrejection', errorCaught);
    };
  }, [props, props.app.isInitialized])
  
  
  const render = () => {
    if(!props.app.isInitialized){
      return <div className="spinner"><Loading  color={'darkcyan'}/></div>
    }
    else{
      return (
        <body className={props.app.darkTheme ? 'darkTheme' : null}>
          <Box sx={{ flexGrow: 1, width: '1200px',
  minHeight: '100vh',
  margin: '0 auto'  }}>
      <Grid container spacing={2}>
        <Grid item  md={12}>
          <HeaderContainer id="header" className='header'/>
        </Grid>
        <Grid item  md={2}>
          <NavbarContainer className='navbar'/>
        </Grid>
        
        <Grid item  md={10}>
          
            <Suspense fallback={<Loading color={'white'} />}>
            <Switch>
            <Route path='/messages' render={ () => <DialogsContainer /> } />
            <Route path='/feed' render={ () => <Feed />} />
            <Route path='/music' render={ () => <Music /> } />
            <Route path='/settings' render={ () => <Settings /> } />
            <Route path='/login' render={ () => <LoginContainer /> } />
              <Route path='/users' render={ () => <UsersContainer /> } />
              <Route path='/profile/:userId?' render={ () => <ProfileContainer /> } />
              <Route path='/' exact><Redirect to='/feed'/></Route>
              <Route path="*" render={() => <div><Button variant="contained">SEMEN RETENTION</Button></div>} />
            </Switch>
            </Suspense>
          
        </Grid>
        <Grid item  md={12}>
        <div className='footer'>
            <Footer />
          </div>
        </Grid>
      </Grid>
      
    </Box>
        

      </body>
    );
    }
  }

  return render();
}

let mapStateToProps = (state) => ({
    app: state.app
});


export default compose(
  withRouter,
  connect(mapStateToProps,{initializeApp})
)(App);
