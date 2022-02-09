import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanionData, getMessages, updateMessages } from '../../redux/dialogsReducer';
import { RootState } from '../../redux/redux-store';
import Message from './Message/Message';
import classes from './Dialogs.module.css';

const CurrentDialog = () => {
    const companionData = useSelector((state: RootState)=>{return state.messenger.companionData})
    const companionPicture = companionData.photos.small
    const myPicture = useSelector((state: RootState) => {return state.auth.signedInUserPage.photos.small})
    const myId = useSelector((state: RootState) => {return state.auth.signedInUserPage.userId})
    const companionId = useSelector((state: RootState) => {return state.messenger.companionId})
    const spot = 'https://wiki-vk.ru/s/001/512/41.png';

    const dispatch = useDispatch();

    const [currentDialogPage, setCurrentDialogPage] = useState(2);

    useEffect(() => {
        dispatch(getMessages(companionId, 1, 20))
        dispatch(getCompanionData(companionId))
      

        // amount of api requests per day is limited!!!! :) 
        // badly that messenger api is REST based and not websocket based
        // setInterval(() => {
            // dispatch(getMessages(companionId, 1, 20))
        // },3000)
      
    }, [companionId]);

    let messagesData = useSelector((state: RootState) => {return state.messenger.apiMessagesData})

    let messages = messagesData
    .map(el => (<Message message={el} myPicture={myPicture} companionId={companionId}
         companionPicture={companionPicture} spot={spot} myId={myId} />));


    let messagesEndRef = useRef<null | HTMLDivElement>(null); ;
    useEffect(() => {
        scrollToBottom();
    }, [messagesData])

    const scrollToBottom = () => {
        //wtf fucking TS ingoring this != null verification and says:
        //"OBJECT IS POSSIBLY NULL SO FUCK YOU, ILL FREEZE YOUR APP, I DONT CARE THAT YOU ARE PREVENTING THIS CASE"
        //@ts-ignore
        if(messagesEndRef != null) messagesEndRef.current.scrollIntoView({ behavior: "auto" })
      }

    const handleScroll = (e: any) => {
        let element = e.target;
        if(element.scrollTop === 0){
            dispatch(updateMessages(companionId, currentDialogPage, 20))
            setCurrentDialogPage(currentDialogPage + 1)
        }
    }

    return <div>
        <div style={{height: '76vh', overflowY: 'scroll'}} className={classes.messages} onScroll={ handleScroll }>
                    {messages.length == 0 && companionId == 0 ? <div>Choose Dialog</div> : messages.length !==0 ? messages : <div>There are no messages. Say Hello!</div>}

                <div ref={messagesEndRef as React.RefObject<HTMLDivElement>} />
        </div>
    </div>;
};

export default CurrentDialog;
