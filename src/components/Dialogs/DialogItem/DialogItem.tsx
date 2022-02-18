import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/dialogsReducer';
import classes from './../Dialogs.module.css';
import { RootState } from '../../../redux/redux-store';
import { useState } from 'react';


const changeCompanionId = actions.changeCompanionId;


type PropsType = {
    id: number,
    name: string,
    photo: string,

    hasNewMessages: boolean,
    newMessagesCount: number,
}

const DialogItem = (props: PropsType) => {
    const companionId = useSelector((state: RootState) => {return state.messenger.companionId})
    const dispatch = useDispatch()
    const [hasNewM, toggleHasNewM] = useState(props.hasNewMessages)

    const changeCurrentDialog = () => {
      if(companionId != props.id) dispatch(changeCompanionId(props.id))
      toggleHasNewM(false)
    }

  return (
      <div>
      <ListItem onClick={changeCurrentDialog} className={`${classes.dialogItem} ${hasNewM && classes.hasNewMessages} ${companionId == props.id && classes.active}`}
       component={Link} to={'/messages/' + props.id}
       alignItems="flex-start">
        <ListItemAvatar>
            <Avatar src={props.photo} component={Link} to={`/profile/${props.id}`}/>
        </ListItemAvatar>
        <ListItemText
          primary={props.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
            {hasNewM && <span className={classes.newMessagesCount}>{props.newMessagesCount} New messages</span>}
                
              </Typography>
              {/* {"Third text"} */}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </div>
  );
}

export default DialogItem;
