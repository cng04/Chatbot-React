import '../css/Chatbot.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, Button } from '@chatscope/chat-ui-kit-react'
import { useState, useEffect, useRef } from 'react';

// Chatbot is parent component of Similar Questions
import SimilarQuestions from './SimilarQuestions';

function Chatbot(props) {
  let listMessages = [
    {
      message: "Hello, I'm your own personal chatbot",
      sender: "OpenAI",
      direction: "incoming"
    }, 
  ];

  const [messages, setMessages] = useState(listMessages);

  // State to indicate whether Open AI is generating the responsem, initial value is falses
  const [typing, setTyping] = useState(false);

  // State to keep and set the similar questions the OpenAI model responds with
  const [similarQuestions, setSimilarQuestions] = useState([]);

  const [showSimilarQuestions, setShowSimilarQuestions] = useState(false);

  // function to handle sending messages
  const handleSend = async (question) => {
    setSimilarQuestions([]);
    setShowSimilarQuestions(false);

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

    if (question.message == "similar") {
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
          setTyping(false);

          if (sq.length != 0) {
            setSimilarQuestions(sq);
            setShowSimilarQuestions(true);
          }
        })
  }

  // Function to clear chatbot messages
  const refresh = (event) => {
    setMessages([]);
  }

  const handleDataFromChild = (data) => {
    console.log(data);
    setSimilarQuestions([]);
    setShowSimilarQuestions(false);
    handleSend(data);
  }

  return (
    <>
      <div className="outer-container">
        <div className="container">
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior='smooth'

                // if typing state is true, show 'Open AI is typing', otherwise don't
                typingIndicator={typing? <TypingIndicator content="Chatbot is typing"/>: null}
              >
                {/* Every message in messages gets a Message component to display to screen */}
                {messages.map((message, i) => {
                  console.log(messages)
                  return <Message key={i} model={message}>
                    <Message.Footer sender={message.sender}/>
                  </Message>
                })}
                <div>
                  <SimilarQuestions showSQ={showSimilarQuestions} sq={similarQuestions} sendDataToParent={handleDataFromChild}/>
                </div>
              </MessageList>
              {/* User inputs messages here */}
              <MessageInput placeholder="Please enter your question here" onSend={handleSend}/>
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
      <div className="refresh-button">
          <Button border onClick={refresh}>Refresh</Button>
      </div>
    </>
  );
}

export default Chatbot;
