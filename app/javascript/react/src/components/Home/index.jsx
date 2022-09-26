import React, { useState } from "react";
import styled from 'styled-components'
import Layout from "../Layout";
import { Link } from 'react-router-dom'
import GameList from "../GameList";
import FilterList from "./FilterList";

const defaultFilters = {
    runs_on_windows: false,
    runs_on_mac: false,
    runs_on_linux: false,
    is_multiplayer: false,
    is_pvp: false,
    is_coop: false,
    current_discount: false
}

const Home = (props) => {
    const [games, setGames] = useState(props.games)
    const [filters, setFilters] = useState(defaultFilters)
    const [wishlist, setWishlist] = useState(props.wishlist.filter(w => w.current_discount > 0))

    const showSettings = (e) => {
        e.preventDefault();
        window.location.replace(window.location.protocol + "//" + window.location.host + '/settings')
      }

    const applyFilters = (e) => {
        const filter = e.target.id
        updated = filters
        updated[filter] = !filters[filter]
        let filteredGames = props.games
        updated.runs_on_windows && (filteredGames = filteredGames.filter(game => game.runs_on_windows))
        updated.runs_on_mac && (filteredGames = filteredGames.filter(game => game.runs_on_mac))
        updated.runs_on_linux && (filteredGames = filteredGames.filter(game => game.runs_on_linux))
        updated.is_multiplayer && (filteredGames = filteredGames.filter(game => game.is_multiplayer))
        updated.is_pvp && (filteredGames = filteredGames.filter(game => game.is_pvp))
        updated.is_coop && (filteredGames = filteredGames.filter(game => game.is_coop))
        updated.current_discount && (filteredGames = filteredGames.filter(game => game.current_discount > 0))
        setFilters(updated)
        setGames(filteredGames)
    

    }

    return (
        <Layout user={props.user} section='Games'>
            {wishlist.length > 0 && <HomeSection>
                <h1>Wishlist games on sale</h1>
                <GameList games={wishlist} />
            </HomeSection>
            }
            <HomeSection>
                <h1>All My Games</h1>
                <FilterList filters={filters} applyFilter={applyFilters} />
                <GameList games={games} />
            </HomeSection>
            
        </Layout>
    )
}


export default Home

// Styling
const HomeSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    a {
        color: #ffcc99;
    }
`
