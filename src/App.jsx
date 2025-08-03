import { useState } from "react";
import SessionsList from "./SessionsList";
import SessionScreen from "./SessionScreen";
import SessionSummary from "./SessionSummary";

export default function App() {
  const [view, setView] = useState("sessions");
  const [currentSession, setCurrentSession] = useState(null);

  if (view === "sessions") {
    return <SessionsList onStart={() => setView("session")} />;
  }

  if (view === "session") {
    return (
      <SessionScreen
        onEnd={(session) => {
          setCurrentSession(session);
          setView("summary");
        }}
      />
    );
  }

  if (view === "summary") {
    return (
      <SessionSummary
        session={currentSession}
        onBack={() => setView("sessions")}
      />
    );
  }

  return <div>Unknown view</div>;
}
