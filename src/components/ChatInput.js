import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({ channelName, channelId, chatRef }) {
    const [input, setInput] = useState('');
    const[user]=useAuthState(auth);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!channelId) {
            return false;
        }

        try {
            const docRef = await addDoc(collection(db, 'rooms', channelId, 'messages'), {
                message: input,
                timestamp: serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL,
            });

             chatRef?.current?.scrollIntoView({
            behavior: 'smooth',
        });
            console.log('Document written with ID: ', docRef.id);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
        // Clear the input after sending the message
        setInput('');
    };

    return (
        <ChatInputContainer>
            <form>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message #${channelName}`}
                />
                <Button hidden type='submit' onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    );
}

export default ChatInput;

const ChatInputContainer = styled.div`
    border-radius: 20px;

    > form {
        position: relative;
        display: flex;
        justify-content: center;
        padding: 40px;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button {
        display: none !important;
    }
`;
