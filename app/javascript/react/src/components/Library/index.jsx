import React, { useState } from 'react'  
import styled from 'styled-components'
import Layout from '../Layout'
import GameList from '../GameList'
import FriendList from '../FriendList'


const Library = (props) => {    
  const [gameList, setGameList] = useState(props.games.filter(games => games.is_multiplayer))
  const [soClose, setSoClose] = useState(false)
  const [notShared, setNotShared] = useState(false)

  const updateGameList = async(friends) => {
    let friend_ids = Object.keys(friends)
    await axios.get("/shared_games?friend_ids=" + friend_ids)
    .then((res) => {
      let shared = res.data.shared_games
      let allHave = [], allButOne = [], theRest = []
      shared.forEach(game => {
        if (game[1].length == friend_ids.length) {
          allHave.push(game[0])
        }
        if (game[1].length == friend_ids.length - 1) {
          allButOne.push(game[0])
        } else {
          theRest.push(game[0])
        }
      });
      setGameList(props.games.filter(games => allHave.includes(games.appid) && games.is_multiplayer))
      setSoClose(props.games.filter(games => allButOne.includes(games.appid) && games.is_multiplayer))
      setNotShared(props.games.filter(games => theRest.includes(games.appid) && games.is_multiplayer))
    })
    .catch((error) => {
      console.error(error)
    })
  }

  return (
    <Layout user={props.user}>
      <h1>Multiplayer Games</h1>
      <FriendList friends={props.friends} updateGameList={updateGameList} />
      <h2>Select friends to see which games you all have</h2>
      {gameList.length > 0 ? <GameSection bg='113311'><h2>Games all selected friends have</h2>
      <GameList games={gameList} /></GameSection>:<h2>No shared games :(</h2>}
      {soClose && <GameSection bg='5e3f1e'><h2>Games most of you have</h2>
      <GameList games={soClose} /></GameSection>}
      {notShared && <GameSection bg='400505'><h2>Your Games</h2>
      <GameList games={notShared} /></GameSection>}
    </Layout>
  )
}

export default Library;

// Styling
const GameSection = styled.div`
background-color: #${props => props.bg};
color: #ccc;
border-radius: 0 50px 0 50px;
width: 100%;
margin: 0 0 2em;
text-align: center;
`
