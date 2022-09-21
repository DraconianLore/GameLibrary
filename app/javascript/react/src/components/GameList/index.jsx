import React from "react";
import styled from 'styled-components'

const GameList = (props) => {
    const openInSteam = (g) => {
        console.log(g)
        window.open(`https://store.steampowered.com/app/${g}`);
    }
    const games = props.games.map((game) => {
        return(
            <GameItem key={game.appid}>
                <ImageContainer>
                    <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`} 
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src='';
                        currentTarget.classList.add('no-img')
                    }} />
                    {game.current_discount > 0 && <SaleBanner>{game.current_discount}% Off</SaleBanner>}
                    <div id={'g' + game.appid} className='gameInfo' onClick={() => openInSteam(game.appid)}>
                        <p>{game.description}</p>
                    </div>
                </ImageContainer>
                <GameName>{game.name}</GameName>
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
`
const GameName = styled.p`
    margin: 0.2em 0 1.5em;
`
const GameItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 460px;
`
const ImageContainer = styled.div`
    position: relative;
    overflow: hidden;
    .gameInfo {
        display: none;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.5);
        cursor: pointer;
        p {
            color: #ff0;
            margin: 1em;
        }
    }
    :hover .gameInfo {
        display: flex;
    }
`
const SaleBanner = styled.div`
    height: 30px;
    width: 160px;
    background-color: #1B9C21;
    position: absolute;
    top: 18px;
    right: -30px;
    text-align: center;
    color: #FFF;
    font-weight: 600;
    font-size: 20px;
    white-space: nowrap;
    -webkit-transform: rotate(35deg);
    -moz-transform: rotate(35deg);
    -ms-transform: rotate(35deg);
    -o-transform: rotate(35deg);
    transform: rotate(35deg);
    display: flex;
    justify-content: center;
    align-items: center;
`
