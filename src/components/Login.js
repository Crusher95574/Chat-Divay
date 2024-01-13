import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { auth, provider, signInWithPopup  } from '../firebase';

function Login() {
    const signIn = async (e) => {
        e.preventDefault();
        try {
          signInWithPopup(auth, provider);
        } catch (error) {
          console.error(error.message);
        }
      };
      
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/chat-icon.png"
          alt="Company Logo"
        />
        <h1>Sign in to your workspace</h1>
        <p>divay.slack.com</p>

        <Button
          onClick={signIn}
          style={{
            marginTop: '50px',
            textTransform: 'inherit',
            backgroundColor: '#0a8d48',
            color: 'white',
          }}
        >
          Sign in with Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const LoginInnerContainer = styled.div`
  text-align: center;
  padding: 50px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > h1 {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
`;
