import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ListItem, NavigationRail,List} from "actify";
import {Home,Camera,UserRound,Settings} from 'lucide-react'
const root = ReactDOM.createRoot(document.getElementById('root'));
const list = [
    {
        label: 'Home',
        icon: <Home />
    },
    {
        label: 'Camera',
        icon: <Camera />
    },
    {
        label: 'User',
        icon: <UserRound />
    },
    {
        label: 'Settings',
        icon: <Settings />
    }
]


root.render(
  <React.StrictMode>
      <BrowserRouter >
          <NavigationRail className={"fixed h-full"}>
              <List className="py-3 w-full">
                  {list.map((item, index) => (
                      <ListItem key={index} className="pl-0 py-2 flex flex-col text-primary">
                          {item.icon}
                          <span className="text-xs font-semibold mt-1">{item.label}</span>
                      </ListItem>
                  ))}
              </List>
          </NavigationRail>
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
