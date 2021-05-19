import React from 'react'
import './Login.css';
import Api from '../Api'

export default () => {
    const handleFacebookLogin = async () => {
        let result = await Api.fbPopup();
        if (result) {

        } else {
            alert("Falha no Login")
        }
    }

    return (
        <div className = "login">
            <button onClick = {handleFacebookLogin}>Logar com o Facebook</button>
        </div>
    )
}