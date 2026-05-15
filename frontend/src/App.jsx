import { useState } from "react";
import "./App.css";

function App() {
  const [fortune, setFortune] = useState("");
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const breakCookie = async () => {
    if (loading) return;

    setLoading(true);
    setOpened(false);

    try {
      const response = await fetch("/api/fortune");
      const data = await response.json();

      setFortune(data.fortune);

      setTimeout(() => {
        setOpened(true);
      }, 300);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const resetCookie = () => {
    setOpened(false);
    setFortune("");
  };

  return (
    <div className="container">
      <h1 className="title">🥠 Fortune Cookie</h1>

      <div
        className={`cookie-container ${opened ? "opened" : ""}`}
        onClick={breakCookie}
      >
        <div className={`crumb crumb1 ${opened ? "show" : ""}`}></div>
        <div className={`crumb crumb2 ${opened ? "show" : ""}`}></div>
        <div className={`crumb crumb3 ${opened ? "show" : ""}`}></div>

        <div className="cookie-left"></div>

        <div className={`fortune-paper ${opened ? "show-paper" : ""}`}>
          <div className="paper-edge"></div>

          <div className="corner-fold"></div>

          <div className="wrinkle"></div>

          <span>{fortune}</span>
        </div>

        <div className="cookie-right"></div>
      </div>

      <p className="instruction">
        Click the cookie to reveal your fortune
      </p>

      {opened && (
        <button className="reset-button" onClick={resetCookie}>
          🔄 New Fortune
        </button>
      )}
    </div>
  );
}

export default App;