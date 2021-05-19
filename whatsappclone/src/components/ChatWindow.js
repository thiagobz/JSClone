import React, {useState, useEffect, useRef} from 'react'
import EmojiPicker from 'emoji-picker-react';
import './ChatWindow.css';

import MessageItem from './MessageItem';

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import { useScrollTrigger } from '@material-ui/core';

export default ({user}) => {

    const body = useRef();

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    const [list, setList] = useState([
        {author:123, body: 'bla bla bla'},
        {author:123, body: 'bla bla'},
        {author:1234, body: 'bla bla bla bla'},
        {author:123, body: 'bla bla bla'},
        {author:123, body: 'bla bla'},
        {author:1234, body: 'bla bla bla bla'},
        {author:123, body: 'bla bla bla'},
        {author:123, body: 'bla bla'},
        {author:1234, body: 'bla bla bla bla'},
        {author:123, body: 'bla bla bla'},
        {author:123, body: 'bla bla'},
        {author:1234, body: 'bla bla bla bla'},
        {author:123, body: 'bla bla bla'},
        {author:123, body: 'bla bla'},
        {author:1234, body: 'bla bla bla bla'},
        {author:123, body: 'bla bla bla'},
        {author:123, body: 'bla bla'},
        {author:1234, body: 'bla bla bla bla'},
        {author:123, body: 'bla bla bla'},
        {author:123, body: 'bla bla'},
        {author:1234, body: 'bla bla bla bla'},
    ]); 

    useEffect(() => {
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
        } 
    }, [])

    const handleEmojiClick = (e, emojiObject) => {
        setText(text + emojiObject.emoji)
    }

    const handleEmojiOpen = () => {
        setEmojiOpen(true)
    }

    const handleEmojiClose = () => {
        setEmojiOpen(false)
    }

    const handleSendClick = () => {

    }

    const handleMicClick = () => {
        if(recognition !== null) {

            recognition.onstart = () => {
                setListening(true);
            }
            
            recognition.onend = () => {
                setListening(false)
            }

            recognition.onresult = (e) => {
                setText( e.results[0][0].transcript)
            }

            recognition.start();
        }
    }


    return (
        <div className = "chatWindow">
            <div className = "chatWindow--header">
                <div className ="chatWindow--headerinfo" >
                    <img className="chatWindow--avatar" src="https://www.w3schools.com/howto/img_avatar2.png"/>
                    <div className = "chatWindow--name">Thiago Bazani</div>
                </div>
            

            <div className = "classWindow--headerbutton">
                <div className = "chatWindow--btn">
                    <SearchIcon style = {{color: '#919191'}}/>
                </div>
                <div className = "chatWindow--btn">
                    <AttachFileIcon style = {{color: '#919191'}}/>  
                </div>
                <div className = "chatWindow--btn">
                    <MoreVertIcon style = {{color: '#919191'}} />  
                </div>
            </div>
            </div>
            <div ref={body} className = "chatWindow--body">
                {list.map((item, key) => (

                    <MessageItem
                    key = {key}
                    data = {item}
                    user = {user}
                    />

                ))}
            
            </div>
                <div 
                className = "chatWindow--emojiArea"
                style = {{height: emojiOpen? '200px' : '0px'}}
                >
                <EmojiPicker 
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>
            <div className = "chatWindow--footer">
                <div className = "window--pre">

                    <div 
                        className = "chatWindow--btn"
                        onClick = {handleEmojiClose}
                        style = {{width: emojiOpen ? 40 :   0}}
                    >
                        <CloseIcon style = {{color: '#919191'}}/>
                    </div>

                    <div 
                        className = "chatWindow--btn"
                        onClick = {handleEmojiOpen}
                    >
                        <InsertEmoticonIcon style = {{color: emojiOpen ? '#009688' : '#919191'}}/>
                    </div>

                </div>

                <div className = "window--inputarea">
                    <input 
                        className ="chatWindow--input" 
                        type="text"
                        placeholder="Digite uma mensagem"
                        value = {text}
                        onChange = {e => setText(e.target.value)}

                    />
                    
                </div>

                <div className = "window--pos">

                    {text !== '' &&
                        <div 
                        className = "chatWindow--btn"
                        onClick = {handleSendClick}
                        >
                            <SendIcon style = {{color: '#919191'}}/>
                        </div>
                    }

                    {text === '' &&
                        <div 
                        className = "chatWindow--btn"
                        onClick = {handleMicClick}
                        >
                            <MicIcon style = {{color: listening ? '#126ECE' : '#919191'}}/>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}