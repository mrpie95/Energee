// App.jsx
import React, { useState } from "react";
import SessionsList from "./SessionsList";
import SessionScreen from "./SessionScreen";
import SessionSummary from "./SessionSummary";

export default function App() {
  const [screen, setScreen] = useState("list"); // "list", "session", or "summary"
  const [summaryData, setSummaryData] = useState(null);

  const startSession = () => setScreen("session");

  const showSummary = (data) => {
    setSummaryData(data);
    setScreen("summary");
  };

  const goHome = () => {
    setSummaryData(null);
    setScreen("list");
  };

  return (
    <>
      {screen === "session" && <SessionScreen onEnd={showSummary} />}
      {screen === "summary" && (
        <SessionSummary data={summaryData} onHome={goHome} />
      )}
      {screen === "list" && (
        <SessionsList onStart={startSession} onSelectSession={showSummary} />
      )}
    </>
  );
}
