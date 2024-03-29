import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ListItem, NavigationRail,List} from "actify";
import {Home,Camera,UserRound,Settings} from 'lucide-react'
import Header from "./composents/Header";
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
      <BrowserRouter >
          <Header/>
          <div className={"flex"}>
                <span className={"w-20"}></span>

              <div className={"flex-1 "}>
                  <App />

              </div>
          </div>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
