import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './react/src/components/Home';
import Library from "./react/src/components/Library";
import Wishlist from './react/src/components/Wishlist';

document.addEventListener('DOMContentLoaded', () => {

  const userNode = document.getElementById('user-data')
  const user = JSON.parse(userNode.getAttribute('data'))
  const gameNode = document.getElementById('library')
  const games = JSON.parse(gameNode.getAttribute('data'))
  const friendNode = document.getElementById('friend-data')
  const friends = JSON.parse(friendNode.getAttribute('data'))
  
  

  const root = ReactDOM.createRoot(gameNode);

root.render(<BrowserRouter>
    <Routes>
      <Route path='/app' element={<Home user={user} games={games} friends={friends} />} />
      <Route path='/library' element={<Library user={user} games={games} friends={friends} />} />
      <Route path='/wishlist' element={<Wishlist user={user} />} />
    </Routes>
  </BrowserRouter>);
})
