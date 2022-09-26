import React from "react";
import styled from 'styled-components'
import GameList from "../GameList";
import Layout from "../Layout";

const Wishlist = (props) => {

    return (
        <Layout user={props.user} section='Wishlist'>
            <h1>My Wishlist</h1>
            <GameList games={props.wishlist} />
        </Layout>
    )
}


export default Wishlist

// Styling
