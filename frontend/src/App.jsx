import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Editor from "react-simple-code-editor";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
import rehypehighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  const [code, setCode] = useState(`function sum(a, b) {
  return 1 + 1;
}`);

  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:3000/ai/ai-review", {
        code,
      });
      setReview(response.data.review);
    } catch (error) {
      console.error("Error getting review:", error);
      setReview("Error: Failed to get code review. Please try again.");
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(newCode) => setCode(newCode)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 16,
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                border: "1px solid #444",
                backgroundColor: "#1e1e1e",
                color: "#fff",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
            Review
          </div>
        </div>
        <div className="right">
          <pre
            style={{
              whiteSpace: "pre-wrap",
              padding: "1rem",
              color: "#fff",
              fontSize: "14px",
              fontFamily: "monospace",
            }}
          >
            <Markdown 
            rehypePlugins={[rehypehighlight]}
            >
              {review}
            </Markdown>
          </pre>
        </div>
      </main>
    </>
  );
}

export default App;
