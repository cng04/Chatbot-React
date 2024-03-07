import React from 'react'
// import { Button } from '@chatscope/chat-ui-kit-react'
import Button from '@mui/material/Button';
import '../css/SimilarQuestions.css'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { useState } from 'react';


// Similar Questions is a Child component of Chatbot, component displays the similar questions
export default function SimilarQuestions(props) {

    // Theme for Button
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

    console.log(props.sq);
    console.log(props.showSQ);

    // Assigning local variables for prop fields
    let similarQuestions = props.sq;
    let showSQ = props.showSQ
    
    // If no similar questions, set similarQuestions to be an empty array
    if (similarQuestions.length === 0) {
        console.log("d");
        similarQuestions = [];
    }

    console.log(similarQuestions);

    // Sends the similar question the user selected back to chatbot (parent)
    const sendSqToParent = (event) => {
        let question = event.target.value;
        console.log(question);

        // sends question to parent
        props.sendDataToParent(question);
    }

    return (
        <>
            <div className="similar-questions-component">
                <div className="similar-questions-text">
                    {showSQ ? <h4>Would you like to try one of these questions?</h4> : null}
                </div>
                <div className="similar-questions-buttons">
                    {/* Create a Button for each similar question in the array */}
                    {similarQuestions.map((sq, i) => {
                        console.log(sq)
                        console.log(i)
                        return <ThemeProvider theme={theme}>
                            {/* Each button represents a similar question */}
                            <Button variant="contained" style={{minWidth: 200, marginLeft: 10, marginRight: 10, marginBottom:10, color: 'black'}} color="cream" key={i} className="sq-button" value={sq.question.message} onClick={sendSqToParent}>{sq.question.message}</Button>
                        </ThemeProvider>
                    })}
                </div>
            </div>
        </>
    )
}
