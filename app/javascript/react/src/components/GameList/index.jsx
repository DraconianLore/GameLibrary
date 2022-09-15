import React from "react";
import styled from 'styled-components'

const GameList = (props) => {
    
    const games = props.games.map((game) => {
        return(
            <GameItem key={game.appid}>
                <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`} 
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src='';
                    currentTarget.classList.add('no-img')
                }} />
                <p>{game.name}</p>
            </GameItem>
        )
    })

    return(
        <GameContainer>
            {games}
        </GameContainer>
    )
}


export default GameList

// Styling
const GameContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
`
const GameItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 460px;
`
