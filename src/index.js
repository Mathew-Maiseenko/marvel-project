import React from 'react';
import { createRoot } from "react-dom/client";
//import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);


