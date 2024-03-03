import '../css/Chatbot.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, Button } from '@chatscope/chat-ui-kit-react'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Chatbot is parent component of Similar Questions
import SimilarQuestions from './SimilarQuestions';

// Chatbot is a parent component of UserPrompt
import UserPrompt from './UserPrompt';

// Chatbot is a parent component of UserReaction
import UserReaction from './UserReaction';

function Chatbot(props) {
  let listMessages = [];

  const [messages, setMessages] = useState(listMessages);

  // State to indicate whether Open AI is generating the responsem, initial value is falses
  const [typing, setTyping] = useState(false);

  // State to keep and set the similar questions the OpenAI model responds with
  const [similarQuestions, setSimilarQuestions] = useState([]);

  // State to control whether similar questions will be shown
  const [showSimilarQuestions, setShowSimilarQuestions] = useState(false);

  // State to control whether messages will be shown
  const [showMessages, setShowMessages] = useState(false);

  // State to control whether user reaction component will be shown
  const [showUserReaction, setShowUserReaction] = useState(false);

  // States to hold previous question and answer
  const [previousQuestion, setPreviousQuestion] = useState("");

  const [previousAnswer, setPreviousAnswer] = useState("");

  // function to handle sending messages
  const handleSend = async (question) => {
    setSimilarQuestions([]);
    setShowSimilarQuestions(false);
    setShowUserReaction(false);
    setShowMessages(true);

     // new message object
     const newQuestion = {
      message: question,
      sender: "Me",
      direction: "outgoing",
    };

    // updating list of messages, ...messages are the old messages, newMessage is the new message
    let newMessages = [...messages, newQuestion];

    console.log(newMessages);

    // updating messages state
    setMessages(newMessages);

    setTyping(true);

    // Sending the new question to be answered to the Open AI model
    await processMessageOpenAI(newQuestion);
  }

  // Will have the OpenAI model process the message and update messages to reflect returned answer
  async function processMessageOpenAI(question) {
    console.log(question.message);

    let api_endpoint = "http://127.0.0.1:8081/question"

    if (question.message === "similar") {
      api_endpoint = "http://127.0.0.1:8081/similar"
    } 

    // if (props.upload == "true") {
    //   api_endpoint = "http://127.0.0.1:8081/index"
    // } else {
    //   api_endpoint = "http://127.0.0.1:8081/question"
    // }

    console.log(props.upload)
    await fetch (api_endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: question
            })
        }).then((response) => {
          return response.json();
        }).then((data) => {
          const answer = data.answer;
          const sq = data.similarQuestions;
          console.log(sq);
          setMessages([...messages, question, answer]);

          // Setting previous question and answer for response POST request
          setPreviousQuestion(question.message);
          setPreviousAnswer(answer.message);

          setTyping(false);

          if (sq.length !== 0) {
            setSimilarQuestions(sq);
            setShowSimilarQuestions(true);
          }

          setShowUserReaction(true);
        })
  }

  // Function to clear chatbot messages
  const refresh = (event) => {
    setMessages([]);
  }

  // Function to handle data passed in from child components
  const handleDataFromChild = (data) => {
    console.log(data);
    setSimilarQuestions([]);
    setShowSimilarQuestions(false);
    setShowUserReaction(false);
    handleSend(data);
  }

  // Function to handle user reaction passed in from User Reaction Child Component
  const handleURFromChild = async (data) => {
    setShowUserReaction(false);

    console.log(data);

    const userReactionRequest = {
      "userReaction": data,
      "question": previousQuestion,
      "answer": previousAnswer
    }

    await axios.post("http://127.0.0.1:8081/userReaction", {
      userReactionRequest
    })
  }

  return (
    <>
      <div className="outer-container">
        <div className="container">
          {
            showMessages ? (
              <ChatContainer>
                <MessageList className="message-list"
                  scrollBehavior='smooth'
                  // if typing state is true, show 'Open AI is typing', otherwise don't
                  // typingIndicator={typing? <TypingIndicator className="typing-indicator" content="Chatbot is typing"/>: null}
                  >
                  {/* Every message in messages gets a Message component to display to screen */}
                  {messages.map((message, i) => {
                    console.log(messages)
                    return <Message key={i} model={message}>
                      <Message.Footer sender={message.sender}/>
                    </Message>
                  })}

                  {/* User Reaction Component */}
                  <UserReaction showUR={showUserReaction} sendUserReactionToParent={handleURFromChild}/>

                  {/* Similar Questions Component */}
                  <div>
                    <SimilarQuestions showSQ={showSimilarQuestions} sq={similarQuestions} sendDataToParent={handleDataFromChild}/>
                  </div>
                  
                </MessageList>
                {
                  typing ? <TypingIndicator className="typing-indicator" content="Chatbot is typing"/> : null    
                }              
                 {/* User inputs messages here */}
                <MessageInput className="message-input" placeholder="Please enter your question here" onSend={handleSend}/>
              </ChatContainer>
              
            ) : (
              <>
              {/* UserPrompt Component */}
              <UserPrompt sendDataToParent={(pq) => {
                setShowMessages(true);
                handleDataFromChild(pq);
              }}/>
              {/* User inputs messages here */}
              <MessageInput className="message-input" placeholder="Please enter your question here" onSend= {handleSend}/>
              </>
            )
          }
        </div>
      </div>
      {/* <div className="refresh-button">
          <Button border onClick={refresh}>Refresh</Button>
      </div> */}
    </>
  );
}

export default Chatbot;
