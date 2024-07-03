import React from "react";
import { set } from "react-hook-form";
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Link } from "react-router-dom";

const client = new W3CWebSocket('ws://localhost:8000/ws/chat/');

const UserChatBox = ({ friend, handleMobileChat }) => {

  return (
    <div className="chat__wrapper">
      <div className="chat__header">
        <Link onClick={() => handleMobileChat()} className="close__chat">
          <i className="fas fa-chevron-left"></i>
        </Link>
        <div className="income__user">
          <div className="income__user__img">
            <img src={friend.avatar} alt="" />
          </div>
          <div className="name__status">
            <h4 className="friend__name">{friend.name}</h4>
            <span className="status">{friend.status}</span>
          </div>
        </div>
      </div>
      <div className="chats">
        <div className="chat__box">
          <div className="outgoing__msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              obcaecati deleniti voluptatum quasi saepe nam.
            </p>
            {/* <!-- <span className="outgoing__msg__time">3:54</span> --> */}
          </div>
          <div className="incoming__msg">
            <div className="incoming__msg__img">
              <img src="images/p2.jpg" alt="" />
            </div>
            <div className="detail">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                obcaecati deleniti voluptatum quasi saepe nam.
              </p>
              {/* <!-- <span className="outgoing__msg__time">3:54</span> --> */}
            </div>
          </div>
          <div className="outgoing__msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              obcaecati deleniti voluptatum quasi saepe nam.
            </p>
            {/* <!-- <span className="outgoing__msg__time">3:54</span> --> */}
          </div>
        </div>
        <span className="last__msg">FRI AT 11:25 AM</span>
        <div className="chat__box">
          <div className="outgoing__msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              obcaecati deleniti voluptatum quasi saepe nam.
            </p>
            {/* <!-- <span className="outgoing__msg__time">3:54</span> --> */}
          </div>
          <div className="incoming__msg">
            <div className="incoming__msg__img">
              <img src="images/p2.jpg" alt="" />
            </div>
            <div className="detail">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                obcaecati deleniti voluptatum quasi saepe nam.
              </p>
              {/* <span className="outgoing__msg__time">3:54</span> */}
            </div>
          </div>
          <div className="outgoing__msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              obcaecati deleniti voluptatum quasi saepe nam.
            </p>
            {/* <span className="outgoing__msg__time">3:54</span> */}
          </div>
        </div>
        <span className="last__msg">FRI AT 11:25 AM</span>
      </div>
      <div className="chat__form">
        <form action="">
          <div className="form__group">
            <input
              type="text"
              name="message"
              placeholder="Type message here..."
            />
            <button type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserChatBox;
