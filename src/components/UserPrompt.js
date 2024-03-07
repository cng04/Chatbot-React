import React from 'react'
import '../css/UserPrompt.css'
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';


export default function UserInfo(props) {

    const promptQuestions = ["How do I clear my browser cache?", "Can Firearm Applications be uploaded to the DIR?", "How do I enter an Adjournment for a matter?"];

    const theme = createTheme({
        palette: {
            cream: {
                main: '#FFFDD0',
                light: '#E9DB5D',
                dark: '#A29415',
                contrastText: '#242105',
            }
        }
    });

    // Sending Prompt Question to Chatbot (Parent)
    const sendPqToParent = (click) => {
        let promptQuestion = click.target.value;
        console.log(promptQuestion);
        props.sendDataToParent(promptQuestion);
    }

  return (
    <div className="userinfo-container">
        <div className="name-container">
            <h1 className="name">
                CourtAssist
            </h1>
        </div>
        <div className="prompt-container">
            <h3 className="prompt">
                Please ask for courtroom assistance, or try one of the following options:
            </h3>
        </div>
        <div className="prompt-options-container">
            {
                promptQuestions.map((pq, i) => {
                    return <ThemeProvider theme={theme}>
                        <Button variant="contained" color="cream" key={i} style={{minWidth: 200, marginLeft: 50, marginRight: 50, color: 'black'}} value={pq} onClick={sendPqToParent}>{pq}</Button>
                    </ThemeProvider>
                })
            }
        </div>
    </div>
  )
}
