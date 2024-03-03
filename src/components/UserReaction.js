import React, { useState } from 'react'
import '../css/UserReaction.css'
import { AiFillLike, AiFillDislike } from 'react-icons/ai';

export default function UserReaction(props) {
    let displayUserReaction = props.showUR;

    const handleLikeClick = (click) => {
        let status = "like";

        console.log(status);

        props.sendUserReactionToParent(status);
    }

    const handleDislikeClick = (click) => {
        let status = "dislike";

        console.log(status);

        props.sendUserReactionToParent(status);
    }

  return (
    <div className="user-reaction-component">
        <div className="user-reaction-text">
            {displayUserReaction ? <h4>Are you satisfied with the response?</h4> : null}
        </div>
        <div className="user-reaction-buttons">
            {displayUserReaction ? 
            <>
                <AiFillLike value={"like"} className="like-button" color="blue" size="40" onClick={handleLikeClick}/>
                <AiFillDislike value={"dislike"} className="dislike-button" color="red" size="40" onClick={handleDislikeClick}/>
            </> : null}
        </div>
    </div>
  )
}
