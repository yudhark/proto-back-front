import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { NavProvider } from "./utils/context.global";

function App() {
  return (
    <NavProvider>
      <Dashboard />
    </NavProvider>
  );
}

export default App;
