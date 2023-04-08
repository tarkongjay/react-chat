import React, { useEffect, useState, useRef } from 'react'
import socketIOClient from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from './ChatBox';
import InputText from './InputText';
import UserLogin from './UserLogin';

export default function ChatContainer() {
  
    let socketio  = socketIOClient("http://localhost:2544")
    const [chats , setChats] = useState([])
    const [user, setUser] = useState(localStorage.getItem("user"))
    const avatar = localStorage.getItem('avatar')
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }    

    useEffect(() => {
      scrollToBottom()
    }, [chats])

    useEffect(()=> {
        socketio.on('chat', senderChats => {
            setChats(senderChats)
        })
    })




   

    function sendChatToSocket(chat){
        socketio.emit("chat" , chat)
    }

    function addMessage(chat){
        const newChat = {...chat , user:localStorage.getItem("user") , avatar}
        setChats([...chats , newChat])
        sendChatToSocket([...chats , newChat])
    }

    function logout(){
        localStorage.removeItem("user")
        localStorage.removeItem("avatar")
        setUser("")   
    }

    function ChatsList(){
        return( <div style={{ height:'75vh' , overflow:'scroll' , overflowX:'hidden' }}>
              {
                 chats.map((chat, index) => {
                  if(chat.user === user) return <ChatBoxSender  key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
                  return <ChatBoxReciever key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
              })
              }
               <div ref={messagesEndRef} />
        </div>)
       
    }

  return (
    <div style={{backgroundColor: '#F5F5F5' , height: '100%'}}>
        {
        user ?
         <div>
        
         <div style={{display:'flex', flexDirection:"row", justifyContent: 'end'}} >
          <h4 style={{padding: '10px' , margin: '10px'}}>ชื่อผู้ใช้: {user}</h4>
          <p onClick={()=> logout()} style={{margin: '10px' , padding: '10px' ,backgroundColor: 'black' , color: 'white' , cursor:'pointer'}} >ลงชื่อออก</p>
           </div>
            <ChatsList
             />
          <InputText addMessage={addMessage}></InputText>
        </div>
        : <UserLogin setUser={setUser} />
        }

     
    </div>
  )
}