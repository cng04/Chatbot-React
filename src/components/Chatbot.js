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

  let newQuestion;

  // function to handle sending messages
  const handleSend = async (question) => {

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
    let api_endpoint = "http://127.0.0.1:8081/question"

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
          console.log(question)
          setMessages([...messages, question, data]);
          setTyping(false);
        })
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
              </MessageList>
              {/* User inputs messages here */}
              <MessageInput placeholder="Please enter your question here" onSend={handleSend}/>
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
      <div>
        <SimilarQuestions/>
      </div>
    </>
  );
}

export default Chatbot;
