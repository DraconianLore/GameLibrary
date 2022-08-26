import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './react/src/components/Home';
import Library from "./react/src/components/Library";
import Wishlist from './react/src/components/Wishlist';
import Settings from "./react/src/components/Settings";

document.addEventListener('DOMContentLoaded', () => {

  const node = document.getElementById('library')
  const data = JSON.parse(node.getAttribute('data'))
  const root = ReactDOM.createRoot(node);

root.render(<BrowserRouter>
    <Routes>
      <Route path='/app' element={<Home user={data} />} />
      <Route path='/library' element={<Library user={data} />} />
      <Route path='/wishlist' element={<Wishlist user={data} />} />
    </Routes>
  </BrowserRouter>);
})
