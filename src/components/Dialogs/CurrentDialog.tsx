import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanionData, getMessages, updateMessages } from '../../redux/dialogsReducer';
import { RootState } from '../../redux/redux-store';
import Message from './Message/Message';
import classes from './Dialogs.module.css';
import { Grid } from '@mui/material';

const CurrentDialog = () => {
    const companionData = useSelector((state: RootState)=>{return state.messenger.companionData})
    const companionPicture = companionData.photos.small
    const myPicture = useSelector((state: RootState) => {return state.auth.signedInUserPage.photos.small})
    const myId = useSelector((state: RootState) => {return state.auth.signedInUserPage.userId})
    const companionId = useSelector((state: RootState) => {return state.messenger.companionId})
    const spot = 'https://wiki-vk.ru/s/001/512/41.png';
    const numberOfPages = useSelector((state: RootState) => {return state.messenger.numberOfPages})

    const dispatch = useDispatch();

    const [currentDialogPage, setCurrentDialogPage] = useState(2);
    const [isDialogInitialized, setDialogInitialized] = useState(false);

    useEffect(() => {
        dispatch(getMessages(companionId, 1, 20))
        dispatch(getCompanionData(companionId))
        setCurrentDialogPage(2)      

        // amount of api requests per day is limited!!!! :) 
        // badly that messenger api is REST based and not websocket based
        // setInterval(() => {
            // dispatch(getMessages(companionId, 1, 20))
        // },3000)
      
    }, [companionId]);

    let messagesData = useSelector((state: RootState) => {return state.messenger.apiMessagesData})

    let messages = messagesData
    .map(el => (<Grid item xs={12}><Message message={el} myPicture={myPicture} companionId={companionId}
         companionPicture={companionPicture} spot={spot} myId={myId} /></Grid>));


    let messagesEndRef = useRef<null | HTMLDivElement>(null); ;

    

    useEffect(() => {
        if(!isDialogInitialized){
            scrollToBottom();
            //setDialogInitialized(isDialogInitialized + 1);
        }
        console.log(currentDialogPage)
    }, [messagesData])

    const scrollToBottom = () => {
        if(messagesEndRef.current != null) messagesEndRef.current.scrollIntoView({ behavior: "auto" })
      }

    const handleScroll = (e: any) => {
        let element = e.target;
        if(element.scrollTop === 0){
            if(currentDialogPage <= numberOfPages) {
                dispatch(updateMessages(companionId, currentDialogPage, 20))
                setCurrentDialogPage(currentDialogPage + 1)
            }
        }
    }

    return <div>
        <div style={{height: '76vh', overflowY: 'scroll'}} className={classes.messages} onScroll={ handleScroll }>
                <Grid container>
                    {messages.length == 0 && companionId == 0 ? <div>Choose Dialog</div> : messages.length !==0 ? messages : <div>There are no messages. Say Hello!</div>}
                </Grid>
                <div ref={messagesEndRef as React.RefObject<HTMLDivElement>} />
        </div>
    </div>;
};

export default CurrentDialog;
