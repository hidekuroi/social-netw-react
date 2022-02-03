import { IconButton } from '@mui/material';
import { Avatar, Stack } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useEffect } from 'react';
//@ts-ignore
import Spot from './../img/41.png';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';


type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const ChatPage = () => {
  return <div>
      <Chat />
  </div>;
};

const Chat = () => {
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

  useEffect(() => {
    let ws: WebSocket

    const closeHandler = () => {
      setTimeout(createChannel, 3000)
    }

    function createChannel() {
      ws?.removeEventListener('close', closeHandler)
      ws?.close()
      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
      ws.addEventListener('close', closeHandler)
      setWsChannel(ws)
    }

    createChannel();
  
    return () => {
      ws.removeEventListener('close', closeHandler)
      ws.close()
    };
  }, []);
  

    return(
      <div>
        <Messages wsChannel={wsChannel}/>
        <SendMessageForm wsChannel={wsChannel}/>
      </div>
    )
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])

  useEffect(()=>{
    const messageHandler = (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data);
      setMessages((prevMessages: any) => [...prevMessages, ...newMessages])
    }
    wsChannel?.addEventListener('message', messageHandler)

    return () => {
      wsChannel?.removeEventListener('message', messageHandler)
    }
  },[wsChannel]);

  return(
    <div>
      <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m} />)}
      </div>
      <div>
      </div>
    </div>
  );
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
  return( <div>
    <Avatar component={Link} sx={{'&:hover': {color: 'gray', backgroundColor: 'gray'}}} to={`/profile/${message.userId}`} 
    alt="userpic" src={message.photo} /> <b>{message.userName}</b>
    <br />
    {message.message}
    <hr />
    </div>
  );
}

const SendMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
  const [message, setMessage] = useState('');
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

  useEffect(() => {
    let openHandler = () => {
      setReadyStatus('ready');
    }
    wsChannel?.addEventListener('open', openHandler)
  
    return () => {
      wsChannel?.removeEventListener('open', openHandler)
    };
  }, [wsChannel]);
  

  const changeMessage = (e: any) => {
    setMessage(e.currentTarget.value)
  }
  const sendMessage = () => {
    if(!message) return;
    wsChannel?.send(message)
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
            <IconButton disabled={readyStatus === 'pending'} sx={{marginTop: '13px'}} color="primary" onClick={sendMessage} aria-label="sendMessage">
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
