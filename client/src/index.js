import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./Pages/Home";
import Login from "./Pages/login/login";
import Register from "./Pages/login/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllTranscation from "./Pages/AllTranscation";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import IncomeForm from "./Pages/Form/IncomeForm";
import ExpenseForm from "./Pages/Form/ExpenseForm";
import UpdateForm from "./Pages/Form/UpdateForm";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/alltransaction" element={<AllTranscation />} />
        <Route path="/update" element={<UpdateForm />} />
        <Route path="/incomeform" element={<IncomeForm />} />
        <Route path="/expenseform" element={<ExpenseForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
