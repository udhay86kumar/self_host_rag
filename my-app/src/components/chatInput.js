import React, { useState } from "react";

const ChatInput = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const defaultValues = [
    {
      id: 1,
      question: "How to Setup Teacher Account?",
    },
    {
      id: 2,
      question: "How to Adding a Course to Your Class?",
    },
    {
      id: 3,
      question: "How to Create Assessments and Lessons?",
    },
  ];

  const submit = () => {
    onSubmit(value);
    setValue("");
  };
  return (
    <div className="prompt-input-box">
      <div className="input-box">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter" && value.trim() != "") {
              submit();
            }
          }}
          onChange={onChange}
          value={value}
          type="text"
          placeholder="Type your message..."
        />
        <img
          onClick={() => submit()}
          src={
            value.trim() != ""
              ? "./img/submit-icon.svg"
              : "./img/dis-submit-icon.svg"
          }
          className={
            value.trim() == "" ? "submit-icon p-events-none" : "submit-icon"
          }
        />
      </div>
      <div className="prompt-response">
        {defaultValues.map((item) => {
          return (
            <button
              className="res-btn"
              key={item.id}
              value={item.question}
              onClick={(e) => onSubmit(e.target.value)}
            >
              {item.question}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChatInput;
