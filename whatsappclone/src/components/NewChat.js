import React, {useState} from 'react'
import './NewChat.css'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default ({user,chatList, show, setShow }) => {
    const [list, setList] = useState([
        {id: 123, avatar: 'https://www.w3schools.com/howto/img_avatar2.png', name: 'Thiago Bazani'},
        {id: 123, avatar: 'https://www.w3schools.com/howto/img_avatar2.png', name: 'Thiago Bazani'},
        {id: 123, avatar: 'https://www.w3schools.com/howto/img_avatar2.png', name: 'Thiago Bazani'},
        {id: 123, avatar: 'https://www.w3schools.com/howto/img_avatar2.png', name: 'Thiago Bazani'},
    ]);

    const handleClose = () => {
        setShow(false)
    }

    return(
        <div className ="newChat" style ={{left: show? 0 : -415}}>
            <div className = "newChat--head">
                <div 
                className = "newChat--backbtn"
                onClick = {handleClose}
                >
                    <ArrowBackIcon style={{color:'#FFF'}}/>
                </div>
                <div className = "newChat--headtitle">
                    Nova Conversa
                </div>

            </div>
            <div className = "newChat--list">
                {list.map((item, key) => (
                    <div className = "newChat--item" key={key}>
                        <img className ="newChat--itemavatar" src ={item.avatar} alt ="" />
                        <div className ="newChat--itemname">{item.name}</div>
                     </div>
                ))}
            </div>
        </div>
    )
}
