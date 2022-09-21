import React, { useState, useEffect } from "react";
import styled from 'styled-components'

const FriendList = (props) => {
    const [selectedFriends, setSelectedFriends] = useState({})
    const [friendList, setFriendList] = useState(false)

    const updateFriends = () => {
        setFriendList(props.friends.map((friend) => {
            return(
                <Friend key={friend.steam_id} selected={selectedFriends[friend.id]} onClick={() => updateSelection(friend.id)}>
                <img src={friend.avatar} />
                <p>{friend.steam_name}</p>
            </Friend>
            )
        }))
    }

    const updateSelection = (friend) => {
        let changing = selectedFriends
        changing[friend] = !changing[friend]
        setSelectedFriends(changing)
        updateFriends()
        props.updateGameList(selectedFriends)
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
    background-color: #693a13;
    border-radius: 0 50px 0 50px;
`
const Friend = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1em;
    cursor: pointer;
    border-radius: 10px;
    ${props => props.selected && 'background-color: rgba(255,255,255,0.2);'}
    p {
        margin: 0;
    }
`
