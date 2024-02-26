import React from 'react'
import { Button } from '@chatscope/chat-ui-kit-react'
import '../css/SimilarQuestions.css'


// Similar Questions is a Child component of Chatbot
export default function SimilarQuestions() {
  return (
    <>
        <div className="similar-questions-component">
            <div className="similar-questions-text">
                Similar Questions will appear here that user can select
            </div>
            <div className="similar-questions-buttons">
                <Button border>Similar Question 1</Button>
                <Button border>Similar Question 2</Button>
                <Button border>Similar Question 3</Button>
                <Button border>Similar Question 4</Button>
            </div>
        </div>
    </>
  )
}
