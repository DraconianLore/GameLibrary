import React from "react";
import styled from 'styled-components'
import { mdiApple, mdiLinux, mdiMicrosoftWindows } from '@mdi/js';
import Icon from '@mdi/react'


const GameList = (props) => {
    const openInSteam = (g) => {
        console.log(g)
        window.open(`https://store.steampowered.com/app/${g}`);
    }
    const games = props.games.map((game) => {
        return(
            <GameItem key={game.appid} className={props.dontHave ? 'dontHave' : ''}>
                <ImageContainer>
                    <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`} 
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src='';
                        currentTarget.classList.add('no-img')
                    }} />
                    {game.current_discount > 0 && <SaleBanner>{game.current_discount}% Off</SaleBanner>}
                    {game.is_pvp && <PvpBanner>PvP</PvpBanner>}
                    {game.is_coop && <CoopBanner>Co-op</CoopBanner>}
                    <div id={'g' + game.appid} className='gameInfo' onClick={() => openInSteam(game.appid)}>
                        <p>{game.description}</p>
                    </div>
                </ImageContainer>
                <GameName><p>{game.name}</p> {game.runs_on_windows && <Icon path={mdiMicrosoftWindows} size={1} />}{game.runs_on_mac && <Icon path={mdiApple} size={1} />}{game.runs_on_linux && <Icon path={mdiLinux} size={1} />}</GameName>
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
const GameName = styled.div`
    margin: 0.2em 0 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        margin: 0 1em
    }
`
const GameItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 460px;
    &.dontHave {
        filter: grayscale(100%) brightness(50%);
    }
`
const ImageContainer = styled.div`
    position: relative;
    height: 215px;
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

const PvpBanner = styled.div`
    height: 20px;
    width: 80px;
    background-color: #9C1B21;
    position: absolute;
    bottom: 8px;
    left: -15px;
    text-align: center;
    color: #FFF;
    font-weight: 600;
    font-size: 12px;
    white-space: nowrap;
    -webkit-transform: rotate(40deg);
    -moz-transform: rotate(40deg);
    -ms-transform: rotate(40deg);
    -o-transform: rotate(40deg);
    transform: rotate(40deg);
    display: flex;
    justify-content: center;
    align-items: center;
`
const CoopBanner = styled.div`
    height: 20px;
    width: 80px;
    background-color: #1B219C;
    position: absolute;
    bottom: 8px;
    right: -15px;
    text-align: center;
    color: #FFF;
    font-weight: 600;
    font-size: 12px;
    white-space: nowrap;
    -webkit-transform: rotate(40deg);
    -moz-transform: rotate(-40deg);
    -ms-transform: rotate(-40deg);
    -o-transform: rotate(-40deg);
    transform: rotate(-40deg);
    display: flex;
    justify-content: center;
    align-items: center;
`
