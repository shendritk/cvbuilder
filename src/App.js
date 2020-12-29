import React from "react";
import AuthProvider from "./components/auth/AuthProvider";
import GlobalState from "./components/utils/GlobalState";
import "./components/styles/main.css";

function App() {
  return (
    <GlobalState>
      <AuthProvider />
    </GlobalState>
  );
}

export default App;
