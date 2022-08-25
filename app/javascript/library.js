import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Library from "./react/src/components/Library"
import React from 'react'

document.addEventListener('DOMContentLoaded', () => {

  const node = document.getElementById('library')
  const data = JSON.parse(node.getAttribute('data'))
  const root = ReactDOM.createRoot(node);
  console.log('data', data)
  root.render(<BrowserRouter>
    <Library user={data} />
  </BrowserRouter>);
})
