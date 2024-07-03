import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../features/users/userActions";
import FriendChat from "../FriendChat";
import { showGreetings } from "../../../utils/handleGreetings";

const UserFriends = ({ user, friends, handleStartChat }) => {

  return (
    <div className="chat__users">
      <div className="current__user__header">
        <div className="search__form__username">
          <form action="">
            <div className="form__group">
              <input type="text" />
            </div>
          </form>
          <div>
            <span className="greeting">{showGreetings}</span>
            <h4>{user.name}</h4>
          </div>
        </div>
        <button>
          <i className="fas fa-search"></i>
        </button>
        <div className="img__fr owner">
          <img src="images/p1.jpg" alt="" />
        </div>
      </div>
      <div className="search__recent__chat">
        <form action="" className="recent__search">
          <div className="form__group">
            <input type="text" placeholder="Search here..." />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="recent__chats">
        <div>
          <h5>Chats</h5>
          <p>
            <small>4</small> recent chat available...
          </p>
        </div>
        <a href="#" className="create__new__chat">
          Create new message
        </a>
      </div>

      <ul>
        {friends &&
          friends.map((friend) => (
            <FriendChat handleStartChat={handleStartChat} key={friend.id} friend={friend} />
          ))}
        {/* <!-- <div className="overlay"></div> --> */}
      </ul>

      <div className="mobile__header">
        <a className="active" href="#">
          <i className="fab fa-facebook-messenger"></i>
          Chats
        </a>
        <a href="#">
          <i className="fas fa-users"></i>
          People
        </a>
        <a href="#">
          <i className="fas fa-gear"></i>
          Settings
        </a>
      </div>
    </div>
  );
};

export default memo(UserFriends);
