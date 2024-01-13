import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/counter/appSlice';
import { doc, collection, orderBy, query } from 'firebase/firestore';
import ChatInput from './ChatInput';
import { db } from '../firebase.js';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import Message from './Message';

function Chat() {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId);

    const roomRef = roomId ? doc(db, 'rooms', roomId) : null;

    const [roomDetails] = useDocument(roomRef);

    const roomMessagesQuery = roomRef
        ? query(collection(roomRef, 'messages'), orderBy('timestamp', 'asc'))
        : null;

    const [roomMessages, loading] = useCollection(roomMessagesQuery);

    const roomName = roomDetails?.data()?.name || '';

    useEffect(() => {
        // Check for both roomId and loading to avoid unnecessary scrolls
        if (chatRef.current && roomId && !loading) {
            chatRef.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, [roomId, loading]);

    return (
        <ChatContainer>
            {roomDetails && roomMessages && (
                 <>
                 <Header>
                     <HeaderLeft>
                         <h4>
                             <strong>#{roomName}</strong>
                         </h4>
                         <StarBorderOutlinedIcon />
                     </HeaderLeft>
                     <HeaderRight>
                         <p>
                             <InfoOutlinedIcon /> Details
                         </p>
                     </HeaderRight>
                 </Header>
 
                 <ChatMessages>
                     {roomMessages?.docs.map((doc) => (
                         <Message
                             key={doc.id}
                             message={doc.data().message}
                             timestamp={doc.data().timestamp}
                             user={doc.data().user}
                             userImage={doc.data().userImage}
                         />
                     ))}
                     <ChatBottom ref={chatRef} />
                 </ChatMessages>
 
                 <ChatInput chatRef={chatRef} channelName={roomName} channelId={roomId} />
             </>
            )}
           
        </ChatContainer>
    );
}

export default Chat;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    > h4 {
        display: flex;
        margin-right: 10px;
    }

    > h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }
`;

const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }
`;

const ChatBottom = styled.div`
    padding-bottom: 20px;
`;
const ChatMessages = styled.div``;


const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`;