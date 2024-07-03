import React from "react";
import { memo } from "react";
import nochat from "../../../assets/images/no-chat.svg";

const NoChat = () => {
  return (
    <div className="no_chats">
      <img src={nochat} alt="" />
      <p>
        Select a conversation or start a <a href="#">new one</a>
      </p>
    </div>
  );
};

export default memo(NoChat);
