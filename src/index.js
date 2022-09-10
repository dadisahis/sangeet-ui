import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { TrackContextProvider } from "./context/trackContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <TrackContextProvider>
        <App />
      </TrackContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
