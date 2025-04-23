import React from "react";

const ChatMessage = ({ history, USER_NAME, MODEL_NAME, pdfref }) => {
  return (
    <div ref={pdfref} className="chat-message-container">
      {history.map((entry, index) => (
        <div
          key={"message_" + index}
          className={
            entry.author == USER_NAME
              ? "chat-response flex-row-reverse"
              : "chat-response"
          }
        >
          {entry.author == USER_NAME ? (
            <div className="user-icon">
              <p>{USER_NAME.charAt(0)}</p>
            </div>
          ) : (
            <div className="chat-bot-icon">
              <img
                key={"img_" + index}
                src="./img/input-bot-icon.svg"
                alt="AI String Icon"
              />
            </div>
          )}
          <div
            className={
              entry.author == USER_NAME
                ? "chat-bot-res border-radius-right"
                : "chat-bot-res border-radius-left"
            }
            key={"content_" + index}
          >
            <p className="bot-name">{entry.author}</p>
            <div className="chat-bot-res-text">
              <p
                className="input-text"
                dangerouslySetInnerHTML={{
                  __html: entry.text,
                }}
              ></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;
