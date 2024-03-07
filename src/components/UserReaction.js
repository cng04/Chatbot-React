import React, { useState } from 'react'
import '../css/UserReaction.css'
import { AiFillLike, AiFillDislike } from 'react-icons/ai';

// Component to display the section where the user can indicate whether they are satisfied or not with 
// the answer they received
export default function UserReaction(props) {
    let displayUserReaction = props.showUR;

    // This function handles if the user liked the answer (clicked thumbs up)
    const handleLikeClick = (click) => {
        let status = "like";

        console.log(status);

        // sends data back to parent (chatbot)
        props.sendUserReactionToParent(status);
    }

    // This function handles if the user disliked the answer (clicked thumbs down)
    const handleDislikeClick = (click) => {
        let status = "dislike";

        console.log(status);

        // sends data back to parent (chatbot)
        props.sendUserReactionToParent(status);
    }

  return (
    <div className="user-reaction-component">
        <div className="user-reaction-text">
            {displayUserReaction ? <h4>Are you satisfied with the response?</h4> : null}
        </div>
        <div className="user-reaction-buttons">
            {/* conditionally renders the thumbs up/down buttons */}
            {displayUserReaction ? 
            <>
                <AiFillLike value={"like"} className="like-button" color="blue" size="40" onClick={handleLikeClick}/>
                <AiFillDislike value={"dislike"} className="dislike-button" color="red" size="40" onClick={handleDislikeClick}/>
            </> : null}
        </div>
    </div>
  )
}
