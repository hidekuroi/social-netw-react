import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import classes from './Menu.module.css';

// type PropsType = {
//   isAuth: boolean | null
// }

// const Menu = (props: PropsType) => {
//   if(props.isAuth){
//     return(
//         <nav className={classes.nav}>
//           <div className={classes.menu}>
//             <div className={classes.item}>
//               <NavLink to="/profile" activeClassName={classes.activeLink}>Profile</NavLink>
//             </div>
//             <div className={classes.item}>
//               <NavLink to="/messages" activeClassName={classes.activeLink}>Messages</NavLink>
//             </div>
//             <div className={classes.item}>
//               <NavLink to="/feed" activeClassName={classes.activeLink}>Feed</NavLink>
//             </div>
//             <div className={classes.item}>
//               <NavLink to='/music' activeClassName={classes.activeLink}>Music</NavLink>
//             </div>
//             <div className={classes.item}>
//               <NavLink to='/users' activeClassName={classes.activeLink}>Users</NavLink>
//             </div>
//             <div className={classes.item}>
//               <NavLink to='settings' activeClassName={classes.activeLink}>Settings</NavLink>
//             </div>
//           </div>
//         </nav>
//     );
//   }
//   return(
//     <nav className={classes.nav}>
//           <div className={classes.menu}>
//             <div className={classes.item}>
//               <NavLink to='/users' activeClassName={classes.activeLink}>Users</NavLink>
//             </div>
//           </div>
//         </nav>
//   );
// }
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import ForumIcon from '@mui/icons-material/Forum';
import { NavLink } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RootState } from '../../../redux/redux-store';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';

type PropsType = {
  isAuth: boolean | null
}

const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        textPrimary: {
          // Some CSS
          color: 'white',
        },
      },
    },
  },
});

const Menu = (props: PropsType) => {
  const unreadMessagesCountData = useSelector((state: RootState) => {return state.messenger.newMessagesCount})
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(unreadMessagesCountData)

  useEffect(() => {
    console.log(unreadMessagesCountData)
    setUnreadMessagesCount(unreadMessagesCountData)
  }, [unreadMessagesCountData])
  

  if(props.isAuth){
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/profile">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText  sx={{ color: '' }} primary="Profile"/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to='/feed'>
                <ListItemIcon>
                  <NewspaperIcon />
                </ListItemIcon>
                <ListItemText primary="Feed" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to='/messages'>
                <ListItemIcon>
                  {unreadMessagesCount > 0 ? <Badge badgeContent={unreadMessagesCount} color='error'>
                    <ChatIcon />
                  </Badge>
                  : <ChatIcon />}
                </ListItemIcon>
                <ListItemText primary="Messenger" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/chat">
                <ListItemIcon>
                  <ForumIcon />
                </ListItemIcon>
                <ListItemText  sx={{ color: '' }} primary="Chat"/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to='/music'>
                <ListItemIcon>
                  <MusicNoteIcon />
                </ListItemIcon>
                <ListItemText primary="Music" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to='/users'>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/settings">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText  sx={{ color: '' }} primary="Settings"/>
              </ListItemButton>
            </ListItem>
          </List>
      </nav>
      <Divider />
    </Box>
  );
  }
  return(
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to='/users'>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
          </List>
      </nav>
      <Divider />
    </Box>
  );
}


export default Menu;