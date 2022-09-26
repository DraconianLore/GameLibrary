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

    const gamesSmall = props.games.map((game) => {
        return(
            <GameItemSmall key={game.appid} className={props.dontHave ? 'dontHave' : ''}>
                <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/capsule_184x69.jpg`} 
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src='';
                        currentTarget.classList.add('no-img-sml')  
                    }} onClick={() => openInSteam(game.appid)} />
                <GameDetailsSml>
                    <p>{game.name}</p> 
                    <GameInfo>
                        {game.runs_on_windows && <Icon path={mdiMicrosoftWindows} size={1} />}
                        {game.runs_on_mac && <Icon path={mdiApple} size={1} />}
                        {game.runs_on_linux && <Icon path={mdiLinux} size={1} />}
                        {game.is_pvp && <PvPIcon>PvP</PvPIcon>}
                        {game.is_coop && <CoopIcon>Co-op</CoopIcon>}
                    </GameInfo>
                    <div id={'g' + game.appid} className='gameInfos'>
                        {game.description}
                    </div>
                    {game.current_discount > 0 && <OnSale><p>On Sale</p>{game.current_discount}% Off</OnSale>}
                </GameDetailsSml>
                
            </GameItemSmall>
        )
    })

    return(
        <GameContainer>
            {props.small ? gamesSmall : games}
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
    max-width: 460px;
    p {
        max-width: 360px;
        margin: 0 1em;
        text-align: center;
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
        :hover {
            filter: none;
        }
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
            color: #fed;
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
// Smaller version
const GameItemSmall = styled.div`
    width: 90vw;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: rgba(0,0,0,0.8);
    height: 89px;
    padding: 0 1em;
    p {
        margin: 0;
    }
    img {
        cursor: pointer;
    }
    :nth-child(odd) {
        background-color: rgba(0,0,0,0.6);
    }
    :hover .gameInfos {
        display: flex;
    }
`
const GameDetailsSml = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-left: 2em;
    height: 69px;
    justify-content: space-around;
    position: relative;
    .gameInfos {
        display: none;
        align-items: center;
        justify-content: center;
        padding: 0.5em;
        position: absolute;
        top: -10px;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.5);
        z-index: 4;
        cursor: pointer;
    }
    
`

const GameInfo = styled.div`
    display: flex;
    
`

const OnSale = styled.div`
    background-color: #0D3910;
    padding: 0 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50% 0 50% 0;
    position: absolute;
    right: 0;
    top: 0;
    height: 69px;
    z-index: 3;
`

const CoopIcon = styled.div`
    background-color: #1B219C;
    padding: 0.2em 0.5em;
    border-radius: 0 10px 0 10px;
    margin-left: 0.5em;
`

const PvPIcon = styled.div`
    background-color: #9C1B21;
    padding: 0.2em 0.5em;
    border-radius: 0 10px 0 10px;
    margin-left: 0.5em;
`