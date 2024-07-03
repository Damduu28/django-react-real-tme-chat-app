import React from "react";
import { Link } from "react-router-dom";

const UserHeaderDeskTop = ({ user, handleLogout }) => {
  return (
    <div>
      <header>
        <div className="chat__user">
          <div className="chat__user__img">
            <img src={user.avatar} alt="" />
          </div>
          <p className="user__name">{user.name}</p>
        </div>
        <ul className="chat__navbar">
          <li>
            <a href="#">
              <i className="fas fa-home"></i>Home
            </a>
          </li>
          <li className="active">
            <a href="#">
              <i className="fab fa-facebook-messenger"></i>Chat
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-gear"></i>Settings
            </a>
          </li>
        </ul>
        <div className="logout__btn">
          <Link onClick={() => handleLogout()}>
            <i className="fas fa-power-off"></i>Logout
          </Link>
        </div>
      </header>
    </div>
  );
};

export default UserHeaderDeskTop;
