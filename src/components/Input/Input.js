import React from 'react'
import "./Input.css";

const Input = ({message,setMessage,sendMessage}) => (
    <form>
        <input
        className="input"
        type="text"
        placeholder="Type a message.."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event =>event.key ==='Enter'?sendMessage(event):null}
        />
        <button className="sendButton" onClick={e =>sendMessage(e)}>SEND</button>

    </form>
)

export default Input
