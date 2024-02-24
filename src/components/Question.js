import React, { useState, useEffect } from 'react';
import '../css/Question.css'

export default function Question() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    // useEffect(() => {
    //     fetch('/question').then(res => res.json()).then(data => {
    //         setCurrentTime(data.time);
    //       });
    // })

    // useEffect(() => {
    //     const fetchAnswer = async () => {
    //         const answer = await fetch ("/question")
    //         setAnswer(answer)
    //     }
    // })

    const submitQuestion = () => {
        // console.log( JSON.stringify({
        //     content: question
        // }))
        setQuestion("");
        fetch ("http://127.0.0.1:8080/question", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: question
            })
        }).then((response) => 
            response.json())
            .then((data) => {
            console.log(data);
            setAnswer(data.answer);
        })
    }

    return (
      <>
        <title>Ask question</title>
        <h1>Ask a Question</h1>
        <form>
            <label>Please enter a question: </label>
            <input 
                className="input"
                type="text"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button type="button" className="submit-button" onClick={submitQuestion}>Submit Question</button>
        </form>
        <div className="answer">
            {answer}
        </div>
      </>
    )
  }