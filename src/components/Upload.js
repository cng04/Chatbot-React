// File not used in CHATBOT UI, simply to test out some features

import React from 'react'
import axios from 'axios';
import Chatbot from './Chatbot';
import '../css/Upload.css'
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function Upload() {

    // State to keep track of file selected
    const [file, setFile] = useState(null);
    
    // Other states
    const [progress, setProgress] = useState({
        started: false, 
        pc: 0
    });

    const [msg, setMsg] = useState(null);

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


    return (
        <>
        {/* This is an example of passing data in the form of props between parent and child components, not actually used in this app right now */}
        <Chatbot upload="true"/>
        <div className="upload-container">
            <div className="upload">
                <div className="upload-text">
                    Please Upload your document by selecting the button below:
                </div>
                {/* Selecting File */}
                <input className="file-input" type="file" onChange={(e) => {setFile(e.target.files[0])}}/>

                {/* Uploading File on click */}
                <div className="buttons">
                    <Button variant="contained" color="secondary" className="upload-button" onClick={handleUpload}>Upload</Button>
                    <Button variant="contained" color="primary" className="clear-button" onClick={clear}>Clear</Button>
                </div>  
            </div>
        </div>  
        </>
    )
}
