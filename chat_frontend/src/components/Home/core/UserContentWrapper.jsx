import React, { memo, useEffect, useState } from "react";
import UserFriends from "./UserFriends";
import UserChatBox from "./UserChatBox";
import NoChat from "./NoChat";
import { useDispatch } from "react-redux";
import { fetchUserFriend } from "../../../features/users/userActions";

const UserContentWrapper = ({ user, friends }) => {
  const [startChat, setStartChat] = useState(false);
  const [chatFriend, setChatFriend] = useState({});
  const [isAcitve, setIsActive] = useState(true);
  const [isMobile, setIsMobile] = useState(() => {
    return localStorage.getItem("mobile")
      ? JSON.parse(localStorage.getItem("mobile"))
      : false;
  });
  const [isMobileChat, setIsMobileChat] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("resize", () => {
      const main = document.querySelector("main");
      let str = window.getComputedStyle(main).getPropertyValue("width");
      let width = +str.slice(0, str.length - 2);
      if (width < 1100) {
        localStorage.setItem("mobile", JSON.stringify(true));
      } else {
        localStorage.setItem("mobile", JSON.stringify(false));
        setIsMobileChat(false);
      }
    });
  }, []);

  const handleStartChat = (id) => {
    setStartChat(true);
    isMobile === true ? setIsMobileChat(true) : setIsMobileChat(false);
    handleUserFriend(id);
    handleActiveFriend();
  };

  const handleUserFriend = (id) => {
    dispatch(fetchUserFriend(id)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setChatFriend(result.payload);
        console.log("Friend Data: ", result);
      }
    });
  };

  const handleActiveFriend = () => {
    setIsActive((prev) => !prev);
  };

  const handleMobileChat = () => {
    setIsMobileChat(false)
  }

  return (
    <section className="chat__content">
      {isMobile && !isMobileChat && (
        <UserFriends
          handleStartChat={handleStartChat}
          user={user}
          friends={friends}
        />
      )}

      {isMobile && isMobileChat && (
        <UserChatBox handleMobileChat={handleMobileChat} friend={chatFriend} />
      )}

      {!isMobile && (
        <UserFriends
          handleStartChat={handleStartChat}
          user={user}
          friends={friends}
        />
      )}

      {startChat ? (
        <UserChatBox handleMobileChat={handleMobileChat} friend={chatFriend} />
      ) : (
        <NoChat />
      )}
    </section>
  );
};

export default memo(UserContentWrapper);
