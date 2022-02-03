import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanionData, getMessages } from '../../redux/dialogsReducer';
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

    useEffect(() => {
        dispatch(getMessages(companionId))
        dispatch(getCompanionData(companionId))
            
      
    }, [companionId]);

    let messagesData = useSelector((state: RootState) => {return state.messenger.apiMessagesData})

    let messages = messagesData
    .map(el => (<Message message={el} myPicture={myPicture} companionId={companionId}
         companionPicture={companionPicture} spot={spot} myId={myId} />));
    

    return <div>
        <div className={classes.messages}>
                    {messages}
        </div>
    </div>;
};

export default CurrentDialog;
