import React from "react";
import styled from 'styled-components'
import Layout from "../Layout";

const Home = (props) => {

    return (
        <Layout user={props.user}>
            <h1>Home Page</h1>
        </Layout>
    )
}


export default Home

// Styling
