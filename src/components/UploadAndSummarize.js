// File used in the upload and summarize feature

import React from 'react'
import '../css/UploadAndSummarize.css'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { MessageInput } from '@chatscope/chat-ui-kit-react'
import { uploadFile, clearDocument, summarize } from '../api';


export default function UploadAndSummarize() {

    // State to keep track of file selected
    const [file, setFile] = useState(null);
    
    // State to handle whether the summarize button is displayed based on whether the user has entered additonal context
    const [generalSummary, setGeneralSummary] = useState(true);

    // State to handle model response for the summary/summary with context operation
    const [response, setResponse] = useState("");

    // State to handle whether the model responded
    const [didModelRespond, setDidModelRespond] = useState(false);

    // State to indicate whether Open AI is generating the response, initial value is false
    const [generatingResponse, setGeneratingResponse] = useState(false);

    // State to indicate uploading has finished - not implemented yet
    // const [uploadingProgress, setUploadingProgress] = useState("");

    // Handles file upload
    const handleUpload = async (click) => {
        // If no file is selected
        if (!file) {
            console.log("No file selected");
            return;
        }

        // Sending request
        try {
            const data = await uploadFile(file);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const clear = async (click) => {
        // Sending clear request
        try {
            const data = await clearDocument();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
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

    const requestSummary = async (context) => {
        setGeneratingResponse(true);
        setDidModelRespond(false);

        try {
            const data = await summarize(context);

            setResponse(data.response);
            setDidModelRespond(true);
        } catch (error) {
            console.log(error);

            setResponse("Sorry, I couldn't reach the server to summarize the document. Please check that the backend is running and try again.");
            setDidModelRespond(true);
        }

        setGeneralSummary(true);
        setGeneratingResponse(false);
    }

    const handleContextSend = async (contextValue) => {
        await requestSummary(contextValue);
    }

    const handleSummarizeSend = async (event) => {
        await requestSummary("");
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
