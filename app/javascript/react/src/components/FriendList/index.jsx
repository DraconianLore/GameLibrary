import React, { useState, useEffect } from "react";
import styled from 'styled-components'

const FriendList = (props) => {
    const [selectedFriends, setSelectedFriends] = useState({})
    const [friendList, setFriendList] = useState(false)

    const updateFriends = () => {
        setFriendList(props.friends.map((friend) => {
            return(
                <Friend key={friend.steam_id} selected={selectedFriends[friend.id]} onClick={() => updateSelection(friend)} privacy={friend.privacy} title={friend.privacy ? 'Private Game List' : friend.steam_name} >
                <img src={friend.avatar} />
                <p>{friend.steam_name}</p>
            </Friend>
            )
        }))
    }

    const updateSelection = (friend) => {
        if(!friend.privacy) {
            let changing = selectedFriends
            changing[friend.id] = !changing[friend.id]
            setSelectedFriends(changing)
            updateFriends()
            props.updateGameList(selectedFriends)
        }
    }

    useEffect(() => {
        updateFriends()
    },[])

    return(
        <FriendContainer>
            {friendList ? friendList : 'Please set friends to public in your steam profile'}
        </FriendContainer>
    )
}


export default FriendList

// Styling
const FriendContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    min-height: 150px;
    width: 90%;
    flex-shrink: 0;
    background-color: #223;
    border-radius: 0 50px 0 50px;
`
const Friend = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1em 1em 0 1em;
    cursor: pointer;
    border-radius: 10px;
    ${props => props.selected && 'background-color: rgba(255,255,255,0.2);'}
    p {
        margin:  0.5em 0;
    }
    ${props => props.selected && 'color: rgba(220, 250, 255, 0.9); img {  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);};'}
    ${props => props.privacy && 'filter: grayscale(100%); cursor: not-allowed;'}
    &:hover {
     color: rgba(220, 250, 255, 0.9);
     img {  
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);};
        }
    }
`
