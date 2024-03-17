// File used in the summarize feature

import React from 'react'
import axios from 'axios';
import '../css/Upload.css'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { MessageInput } from '@chatscope/chat-ui-kit-react'


export default function Upload() {

    // State to keep track of file selected
    const [file, setFile] = useState(null);
    
    // Other states
    const [progress, setProgress] = useState({
        started: false, 
        pc: 0
    });

    const [msg, setMsg] = useState(null);

    // State to handle whether the summarize button is displayed based on whether the user has entered additonal context
    const [generalSummary, setGeneralSummary] = useState(true);

    // State to handle model response for the summary/summary with context operation
    const [response, setResponse] = useState("");

    // State to handle whether the model responded
    const[didModelRespond, setDidModelRespond] = useState(false);

    // State to indicate whether Open AI is generating the responsem, initial value is false
    const [generatingResponse, setGeneratingResponse] = useState(false);

    // Handles file upload
    const handleUpload = async (click) => {
        // If no file is selected
        if (!file) {
            console.log("No file selected");
            return;
        }
        
        // Otherwise create a FormData object, FormData sets POST request headers automatically
        // Also FormData supports multiple files
        const fd = new FormData();
        fd.append("file", file);

        console.log(fd);

        setMsg("Uploading in progress ...");

        // Sending request
        axios.post("http://127.0.0.1:8081/upload", fd, {
            onUploadProgress: (progressEvent) => { console.log(progressEvent.progress * 100) },
        })
        .then((response) => {return response.data;}).then((data) => console.log(data))
        .catch((error) => console.log(error));

        // fetch("http://127.0.0.1:8081/upload", {
        //     method: "POST",
        //     body: fd
        // }).then((response) => response.json()).catch((error) => console.log(error));
    }

    const clear = (click) => {
        const msg = {"message": "clear"}

        // Sending clear request
        axios.post("http://127.0.0.1:8081/clear", msg)
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    }

    // Checks if the user has entered something in the message input field
    // If they have entered something don't display the summarize button
    

    // value in this case represents the innerHtml parameter in MessageInputProps interface
    // control click on onChange to see the interface
    const checkMessageInputValue = (value) => {
        console.log(value);
        if (value.length !== 0) {
            setGeneralSummary(false);
        } else {
            setGeneralSummary(true);
        }
    }

    // Handles additional context message input
    const handleContextSend = async (contextValue) => {
        const contextRequest = {
            "context": contextValue
        }

        setGeneratingResponse(true);
        setDidModelRespond(false);

        // Sending additional context request
        await axios.post("http://127.0.0.1:8081/summarize", {
            contextRequest
        }).then((response) => {
            setResponse(response.data.response);
            setDidModelRespond(true);
            setGeneralSummary(true);
            setGeneratingResponse(false);
        })
    }

    // Handles summarize button click
    const handleSummarizeSend = async (event) => {
        const contextRequest = {
            "context": event.target.value
        }

        setGeneratingResponse(true);
        setDidModelRespond(false);

        // Sending additional context request
        await axios.post("http://127.0.0.1:8081/summarize", {
            contextRequest
        }).then((response) => {
            setResponse(response.data.response);
            setDidModelRespond(true);
            setGeneratingResponse(false);
        })
    }


    return (
        <>
        {/* This is an example of passing data in the form of props between parent and child components, not actually used in this app right now */}
        <div className="upload-container">
            <div className="upload">
                <div className="upload-text">
                    Please Upload your document by selecting the button below:
                </div>
                <div className="file-input-container">
                    {/* Selecting File */}
                    <input className="file-input" type="file" onChange={(e) => {setFile(e.target.files[0])}}/>
                </div>
                

                {/* Uploading File on click */}
                <div className="buttons">
                    <Button variant="outlined" color="secondary" className="upload-button" onClick={handleUpload}>Upload</Button>
                    <Button variant="outlined" style={{marginLeft: 20}} color="secondary" className="clear-button" onClick={clear}>Clear</Button>
                </div> 
                <div className="input-instructions">
                    Please use the input bar below, if you would like a specific area in the uploaded document summarized or to provide additional context to the model.
                </div>
                <div className="input-container">
                    <MessageInput className="message-input" placeholder="Please enter your additional context here" onChange={checkMessageInputValue} onSend={handleContextSend}/>
                </div> 
                {
                    generalSummary ? (
                        <div className="summarize-button-container">
                            <Button className="summarize-button" variant="outlined" onClick={handleSummarizeSend}>Summarize</Button>
                         </div>
                    ) : <></>
                }
                {
                    didModelRespond ? (
                        <div className="response-container">
                            <h3>Here is the response:</h3>
                            {response}
                        </div>
                    ) : <>
                            {
                                generatingResponse ? (
                                    <h3>Generating Response ...</h3>
                                ) : <></>
                            }
                        </>
                }
            </div>
        </div>  
        </>
    )
}
