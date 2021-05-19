import React, {useState, useEffect} from 'react';
import './App.css'

import ChatListItem from './components/ChatListItem'
import ChatIntro from './components/ChatIntro'
import ChatWindow from './components/ChatWindow'
import NewChat from './components/NewChat'
import Login from './components/Login'

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';



export default() =>{

    const [chatList, setChatList] = useState([
        {chatId: 1, title:'Fulano de Tal', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
        {chatId: 2, title:'Fulano de Tal', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
        {chatId: 3, title:'Fulano de Tal', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
        {chatId: 4, title:'Fulano de Tal', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
    ])
    const [activeChat, setActiveChat] = useState({});
    const [user, setUser] = useState(null);

    const [showNewChat, setShotNewChat] = useState(false);
    const handleNewChat = () => {
        setShotNewChat(true)
    }

    const handleLoginData = async (u) => {
        let newUser = {
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL
        }
        //  

        setUser(newUser)
    }

    if(user === null) {
        return (<Login onReceive={handleLoginData}/>)
    }

    return (
       <div className="app-window"> 
            <div className='sidebar'>
                <NewChat
                    cjatList = {chatList}
                    user = {user}
                    show = {showNewChat}
                    setShow = {setShotNewChat}
                />
                <header>
                    <img className="header--avatar" src={user.avatar} alt=""></img>
                    <div className="header--button">
                        <div className="header--btn">
                            <DonutLargeIcon style={{color: '#919191'}} />
                        </div>
                        <div onClick= {handleNewChat} className="header--btn">
                            <ChatIcon style={{color: '#919191'}} />
                        </div>
                        <div className="header--btn">
                            <MoreVertIcon style={{color: '#919191'}} />
                        </div>
                    </div>
                </header>

                <div className="search">
                    <div className="search--input">
                        <SearchIcon fontSize="small" style={{color: '#919191'}} />
                        <input type="search" placeholder="Procurar ou começar uma nova conversa"></input>
                    </div>
                </div>

                <div className ="chatList">
                    {chatList.map((item, key)=>(
                        <ChatListItem 
                            key = {key}
                            data = {item}
                            active = {activeChat.chatId === chatList[key].chatId}
                            onClick = {()=> setActiveChat(chatList[key])}
                        />    
                ))}
                </div>
            </div>

            <div className='contentArea'> 
                {activeChat.chatId !== undefined && 
                    <ChatWindow 
                        user = {user}
                    />
                }
                {activeChat.chatId === undefined &&
                    <ChatIntro />}
            </div>
        </div>
    )
}