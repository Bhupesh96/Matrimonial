import React from "react";

const ChatBox = () => {
  return (
    <div className="chatbox">
      <span className="comm-msg-pop-clo">
        <i className="fa fa-times" aria-hidden="true"></i>
      </span>

      <div className="inn">
        <form name="new_chat_form" method="post">
          <div className="s1">
            <img src="images/user/2.jpg" className="intephoto2" alt="" />
            <h4>
              <b className="intename2">Julia</b>,
            </h4>
            <span className="avlsta avilyes">Available online</span>
          </div>

          <div className="s2 chat-box-messages">
            <span className="chat-wel">Start a new chat!!! now</span>
            <div className="chat-con">
              <div className="chat-lhs">Hi</div>
              <div className="chat-rhs">Hi</div>
            </div>
          </div>

          <div className="s3">
            <input
              type="text"
              name="chat_message"
              placeholder="Type a message here.."
              required
            />
            <button id="chat_send1" name="chat_send" type="submit">
              Send <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
