import React from 'react'  
import styled from 'styled-components'
import Layout from '../Layout'
import GameList from '../GameList'

const Library = (props) => {    

  return (
    <Layout user={props.user}>
      <h1>My Games</h1>
      <GameList games={props.games} />
    </Layout>
  )
}                                                       

export default Library;

// Styling
