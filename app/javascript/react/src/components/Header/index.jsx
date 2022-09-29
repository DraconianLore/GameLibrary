import React from 'react'
import styled from 'styled-components'

const Header = (props) => {

    const logOut = () => {
        fetch('/auth/logout')
            .then(() => {
                window.location.replace(window.location.protocol + "//" + window.location.host)
            })
    }

    return(
        <HeaderBar>
            <Menu />
            <h1>{props.user.steam_name || props.user.name}'s {props.section || 'Game Matcher'}</h1>

            <LogoutButton onClick={logOut}>Logout</LogoutButton>
        </HeaderBar>

    )
}


export default Header

// Styling
const HeaderBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 75px;
    background-color: #334;
    color: #acf;
    h1 {
        align-self: center;
    }
`

const Menu = styled.p`
    font-size: 150%;
    margin-left: 1em;
    width: 3em;
`

const LogoutButton = styled.p`
    font-size: 150%;
    margin-right: 1em;
    background-color: #223;
    border: 1px solid #333;
    padding: 0.1em 0.5em;
    border-radius: 10px;
    &:hover {
        background-color: #446;
    }
    cursor: pointer;
    width: 3em;
`
