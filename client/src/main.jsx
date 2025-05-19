import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TransactionProvider } from "./context/Transactioncontext.jsx";
import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from 'react-router-dom';


createRoot(document.getElementById("root")).render(
  <HashRouter>
    <TransactionProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </TransactionProvider>
    </HashRouter>
);
