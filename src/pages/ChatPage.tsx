import { IconButton } from '@mui/material';
import { Avatar, Stack } from '@mui/material';
import React, { useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useEffect } from 'react';
//@ts-ignore
import Spot from './../img/41.png';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { chatAPI } from '../api/chat-api';
import { useDispatch, useSelector } from 'react-redux';
import { ChatMessageType, sendMessage, startMessageListening, stopMessageListening } from '../redux/chatReducer';
import { RootState } from '../redux/redux-store';
import { actions } from '../redux/chatReducer';

const cleanMessages = actions.cleanMessages

const ChatPage = () => {
  return <div>
      <Chat />
  </div>;
};

const Chat: React.FC = () => {

    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(startMessageListening())
      return () => {
        dispatch(stopMessageListening())
        dispatch(cleanMessages())
      }
    }, [])
    
    return(
      <div>
        <Messages />
        <SendMessageForm />
      </div>
    )
}

const Messages: React.FC<{}> = ({}) => {
  const messages = useSelector((state: RootState) => {return state.chat.messages})
  const messagesRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    let element = e.currentTarget
    if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 250){
      setIsAutoScroll(true)
    }
    else{
      setIsAutoScroll(false)
    }
  }

  useEffect(() => {

    if(isAutoScroll){ 
      setTimeout(() => {
        messagesRef.current?.scrollIntoView({behavior: 'smooth'})
      }, 300);
    }
    
  }, [messages])


  return(
    <div>
      <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.length > 0 ?
        messages.map((m, index) => <Message key={m.id} message={m} />)
        :
        <div>There are no messages.</div>}
        <div ref={messagesRef}></div>
      </div>
      <div>
      </div>
    </div>
  );
}

const Message: React.FC<{message: ChatMessageType}> = React.memo(({message}) => {
  console.log('>>>>>> MESSAGE')
  return( <div>
    <Avatar component={Link} sx={{'&:hover': {color: 'gray', backgroundColor: 'gray'}}} to={`/profile/${message.userId}`} 
    alt="userpic" src={message.photo} /> <b>{message.userName}</b>
    <br />
    {message.message}
    <hr />
    </div>
  );
})

const SendMessageForm: React.FC<{}> = ({}) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch()

  const status = useSelector((state: RootState) => {return state.chat.status})

  const changeMessage = (e: any) => {
    setMessage(e.currentTarget.value)
  }
  const onSendMessage = () => {
    if(!message) return;
    dispatch(sendMessage(message))
    setMessage('')
  }

  return(
    <div>
            <Stack direction="row" spacing={2}>
            <div>
            <TextField sx={{marginBottom: '10px', marginTop: '7px'}}
              placeholder='Enter your message'
              type="text"
              autoComplete='off'
              value={message}
              onChange={changeMessage}
            />
            </div>
            <div>
            <IconButton disabled={status !== 'ready'} sx={{marginTop: '13px'}} color="primary" onClick={onSendMessage} aria-label="sendMessage">
                <SendIcon />
            </IconButton>
            </div>
            </Stack>
            
      {/* <textarea value={message} onChange={changeMessage}></textarea>
      <button onClick={sendMessage}>Send</button> */}
    </div>
  );
}

export default ChatPage;
