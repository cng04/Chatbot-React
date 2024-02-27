import React from 'react'
import { Button } from '@chatscope/chat-ui-kit-react'
import '../css/SimilarQuestions.css'
import { useState } from 'react';


// Similar Questions is a Child component of Chatbot
export default function SimilarQuestions(props) {

    console.log(props.sq);
    let similarQuestions = props.sq;

    if (similarQuestions.length == 0) {
        console.log("d");
        similarQuestions = [];
    }

    console.log(similarQuestions);

    // Sends the question back to chatbot (parent)
    const sendSqToParent = (event) => {
        let question = event.target.value;
        console.log(question);
        props.sendDataToParent(question);
    }

    return (
        <>
            <div className="similar-questions-component">
                <div className="similar-questions-text">
                    Did you mean one of these questions?
                </div>
                <div className="similar-questions-buttons">
                    {/* Create a Button for each similar question in the array */}
                    {similarQuestions.map((sq, i) => {
                        console.log(sq)
                        console.log(i)
                        return <Button className="sq-button" border value={sq.question.message} onClick={sendSqToParent}>{sq.question.message}</Button>
                    })}
                </div>
            </div>
        </>
    )
}
