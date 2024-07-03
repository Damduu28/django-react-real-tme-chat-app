import React, { useEffect, useState } from "react";

const FriendChat = ({ friend, handleStartChat }) => {

  return (
    <li onClick={() => handleStartChat(friend.id)}>
      <div className="friend">
        <div className="img__fr">
          <img src={friend.avatar} alt="" />
        </div>
        <div className="current__chat">
          <div className="user__msg">
            <h5>{friend.name}</h5>
            <span className="time">9:33 ago</span>
          </div>
          <div className="current__msg">
            <p>Lorem ipsum dolor sit amet conse...</p>
            <span className="active">200</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default FriendChat;
