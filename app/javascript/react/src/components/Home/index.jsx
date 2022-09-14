import React from "react";
import styled from 'styled-components'
import Layout from "../Layout";
import { Link } from 'react-router-dom'

const Home = (props) => {
    const showSettings = (e) => {
        e.preventDefault();
        window.location.replace(window.location.protocol + "//" + window.location.host + '/settings')
      }
    return (
        <Layout user={props.user}>
            {props.user.wishlist && <HomeSection>
                    <h1>Wishlist games</h1>
                </HomeSection>
            }
            {props.user.steam_name ?<HomeSection>
                <h1>section 2</h1>
            </HomeSection>
            :<HomeSection>
                <h2>Please go to your <Link id="settings" to='#' onClick={showSettings}>Settings Page</Link> and link your steam account</h2>
            </HomeSection>}
        </Layout>
    )
}


export default Home

// Styling
const HomeSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    a {
        color: #ffcc99;
    }
`
