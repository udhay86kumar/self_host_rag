import React, { useRef, useState } from "react";
// import generatePDF, { Margin } from "react-to-pdf";
import ChatInput from "./chatInput";
import ChatMessage from "./chatMessage";
import GetResponse from "../services/getResponse";

const Home = () => {
  const MODEL_NAME = "StringAssist";
  const USER_NAME = "User";
  const pdfref = useRef(null);
  const [history, setHistory] = useState([
    { author: MODEL_NAME, text: "How can I help you?" },
  ]);

  const addHistory = (text, author) => {
    setHistory((prevHistory) => [...prevHistory, { text, author }]);
  };

  const formatLinks = (text) => {
    console.log("text", text);
    const urlFileNameRegEx = /(?<=\/)[^\/\?#]+(?=[^\/]*$)/;
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    var pdfRegex = /\.(pdf|docx|pptx)$/;
    var imageRegex = /\.(jpg|jpeg|png)$/;
    var linkRegex = /\.(html)$/;
    return text.replace(urlRegex, function (url) {
      console.log("url", url);
      var str = url.replace(/\.$/, "");
      console.log("str", str);
      var filename;
      if (linkRegex.test(str)) {
        filename = urlFileNameRegEx.exec(str)[0].split(".")[0];
        filename = filename.replace(
          /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
          " "
        );
        return (
          '<span class="hyper-link"><a class="hyper-link input-res-btn" target="_blank" href="' +
          str +
          '">' +
          `<span> ${str}</span> ` +
          "</a></span>"
        );
      } else if (pdfRegex.test(str)) {
        filename = urlFileNameRegEx.exec(str)[0].split(".")[0];
        filename = filename.replace(
          /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
          " "
        );
        return (
          '<span class="hyper-link"><a class="hyper-link input-res-btn" target="_blank" href="' +
          str +
          '">' +
          `<span> ${str}</span>` +
          "</a></span>"
        );
      } else if (imageRegex.test(str)) {
        filename = urlFileNameRegEx.exec(str)[0].split(".")[0];
        filename = filename.replace(
          /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
          " "
        );
        return (
          '<span class="hyper-link"><a class="hyper-link input-res-btn" target="_blank" href="' +
          str +
          '">' +
          `<span> ${str}</span>` +
          "</a></span>"
        );
      } else {
        filename = urlFileNameRegEx.exec(str)[0].split(".")[0];
        filename = filename.replace(
          /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
          " "
        );
        return (
          '<span class="hyper-link"><a class="hyper-link input-res-btn" target="_blank" href="' +
          str +
          '">' +
          `<span> ${str}</span> ` +
          "</a></span>"
        );
      }
    });
  };

  const onSubmit = async (prompt) => {
    addHistory(prompt, USER_NAME);
    const response = await GetResponse(prompt);
    const formattedResponse = formatLinks(response);
    addHistory(formattedResponse, MODEL_NAME);
  };

  // const handleDownloadPDF = () => {
  //   const options = {
  //     filename: "chat_history.pdf",
  //     page: {
  //       margin: Margin.SMALL,
  //     },
  //   };
  //   // generatePDF(pdfref, options);
  // };

  return (
    <div className="home-container">
      {/* <div className="bot-container">
        <img src="./img/bot-icon.svg" alt="Bot" />
      </div> */}
      <div className="bot-intro">
        <p className="bot-title mb-10">AI Driven Chatbot</p>
        <p className="bot-subtitle mb-20">
          Experience real-time support assistance with String Assistance
        </p>
      </div>
      <div className="prompt-container">
        <div className="left-wrapper-content">
          <div className="chat-tab"></div>
        </div>
        <div className="right-wrapper-content">
          <div className="prompt-res-wrapper">
            <div
              className="pdf-download-btn cursor-pointer"
              // onClick={() => handleDownloadPDF()}
            >
              <img
                src="./img/download-icon.svg"
                alt="download"
                title="Download"
              />
            </div>
            <ChatMessage
              history={history}
              MODEL_NAME={MODEL_NAME}
              USER_NAME={USER_NAME}
              pdfref={pdfref}
            />
          </div>
          <div className="prompt-input-wrapper">
            <ChatInput onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
