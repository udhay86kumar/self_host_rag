import { useState } from "react";
import axios from "axios";
import "./App.css";
import Home from "./components/home";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    //     try {
    //       const res = await fetch(`http://localhost:5678/webhook-test/chat-message?prompt=${prompt}`, {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' },
    //         // body: JSON.stringify({ prompt }),
    //       });
    // console.log("res", res)
    //       const data = await res.json();
    //       setResponse(data.response || 'No response from backend');
    //     } catch (err) {
    //       console.error(err);
    //       setResponse('❌ Error connecting to chatbot backend');
    //     } finally {
    //       setLoading(false);
    //     }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_N8N_WEBHOOK_URL}?prompt=${prompt}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("res", res.data.response);
      setResponse(res.data.response || "No response from backend");
    } catch (err) {
      console.error(err);
      setResponse("❌ Error connecting to chatbot backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
    //   <h2>🧠 Chat with RAG Bot</h2>
    //   <textarea
    //     rows="4"
    //     cols="50"
    //     value={prompt}
    //     onChange={(e) => setPrompt(e.target.value)}
    //     placeholder="Type your question here..."
    //     disabled={loading}
    //     style={{ width: "100%", padding: 10 }}
    //   />
    //   <br />
    //   <button onClick={sendPrompt} disabled={loading} style={{ marginTop: 10 }}>
    //     {loading ? (
    //       <div class="spinner-border" role="status">
    //         <span class="visually-hidden">Loading...</span>
    //       </div>
    //     ) : (
    //       "Send"
    //     )}
    //   </button>
    //   <div style={{ marginTop: 20 }}>
    //     <strong>Response:</strong>
    //     <p
    //       className="res-text"
    //       dangerouslySetInnerHTML={{ __html: response }}
    //     ></p>
    //   </div>
    // </div>
    <Home />
  );
}

export default App;
