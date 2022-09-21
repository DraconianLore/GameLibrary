import React from "react";
import styled from 'styled-components'


const FilterList = (props) => {

    return(

        <Filters>
            <Filter id='runs_on_windows' active={props.filters.runs_on_windows} onClick={props.applyFilter}>Windows</Filter>
            <Filter id='runs_on_mac' active={props.filters.runs_on_mac} onClick={props.applyFilter}>Mac</Filter>
            <Filter id='runs_on_linux' active={props.filters.runs_on_linux} onClick={props.applyFilter}>Linux</Filter>
            {props.multiplayerOnly || <><Filter id='is_multiplayer' active={props.filters.is_multiplayer} onClick={props.applyFilter}>Multiplayer</Filter>
            <Filter id='is_pvp' active={props.filters.is_pvp} onClick={props.applyFilter}>PvP</Filter>
            <Filter id='is_coop' active={props.filters.is_coop} onClick={props.applyFilter}>Co-op</Filter></>}
            <Filter id='current_discount' active={props.filters.current_discount} onClick={props.applyFilter}>On Sale</Filter>
        </Filters>
    )
}


export default FilterList

// Styling
const Filters = styled.div`
    display: flex;
    width: 90%;
    align:items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.2);
`
const Filter = styled.p`
    font-size: 120%;
    background-color: ${props => props.active ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.4)'};
    border-radius: 10px;
    margin: 0.5em;
    padding: 0.2em 0.4em;
    cursor: pointer;
`
