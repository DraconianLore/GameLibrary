import React, { useState } from 'react'  
import styled from 'styled-components'
import Layout from '../Layout'
import GameList from '../GameList'
import FriendList from '../FriendList'


const Library = (props) => {    
  const [gameList, setGameList] = useState(props.games.filter(games => games.is_multiplayer))
  const [soClose, setSoClose] = useState(false)
  const [notShared, setNotShared] = useState(false)
  const [friendCount, setFriendCount] = useState(0)
  const [onWishlist, setOnWishlist] = useState(false)

  const updateGameList = async(friends) => {

    let friend_ids = Object.keys(friends).filter(k => friends[k] === true)
    setFriendCount(friend_ids.length)
    await axios.get("/shared_games?friend_ids=" + friend_ids)
    .then((res) => {
      let shared = res.data.shared_games
      let allHave = [], allButOne = [], theRest = []
      shared.forEach(game => {
        if (game[1].length == friend_ids.length && friend_ids.length > 0) {
          allHave.push(game[0])
        } else if (game[1].length == friend_ids.length - 1) {
          allButOne.push(game[0])
        } else {
          theRest.push(game[0])
        }
      });
      setGameList(props.games.filter(games => allHave.includes(games.appid) && games.is_multiplayer))
      setSoClose(props.games.filter(games => allButOne.includes(games.appid) && games.is_multiplayer))
      setNotShared(props.games.filter(games => theRest.includes(games.appid) && games.is_multiplayer) || false)
    })
    .catch((error) => {
      console.error(error)
    })
    await axios.get("/check_wishlist?friend_ids=" + friend_ids)
    .then((res) => {
      let shared = res.data.shared_games
      setOnWishlist(shared)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  return (
    <Layout user={props.user} section='friends'>
      <SelectFriends>Select friends to see which games you all have</SelectFriends>
      <FriendList friends={props.friends} updateGameList={updateGameList} />
      {friendCount > 0 &&<GameSection bg='113311'>
        {gameList.length >= 1 ? <><h2>{friendCount == 0 ? 'My Multiplayer Games' : 'Multiplayer games all selected friends have'}</h2>
        <GameList games={gameList} /></>
        : friendCount >= 1 && <h2>No shared multiplayer games :(</h2>}
        {(onWishlist.length > 0 && friendCount > 0) && <>
          <h3>You are the only missing these games from your wishlist</h3>
         <GameList games={onWishlist} dontHave={true} />
        </>}
      </GameSection>}
      {soClose.length >= 1 && <GameSection bg='4f1c02'><h2>Multiplayer games most of you have</h2>
      <GameList games={soClose} /></GameSection>}
      {(notShared.length >= 1 || friendCount === 0) && <GameSection bg='303B47'><h2>Your Multiplayer Games</h2>
      <GameList games={notShared.length > 0  ? notShared : gameList} /></GameSection>}
    </Layout>
  )
}

export default Library;

// Styling
const HeadingH1 = styled.h1`
  margin-bottom: 0;
`
const GameSection = styled.div`
  background-color: #${props => props.bg};
  color: rgba(255,255,255,0.6);
  border-radius: 0 50px 0 50px;
  width: 100%;
  margin: 0 0 2em;
  text-align: center;
`
const SelectFriends = styled.h3`
  background-color: #223;
  margin-bottom: 0;
  border-radius: 50px 50px 0 0;
  padding 0.5em 1em 0;
`
