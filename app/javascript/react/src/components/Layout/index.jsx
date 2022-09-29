import React from 'react'
import styled from 'styled-components'
import SideMenu from '../Menu'
import Header from '../Header'


const Layout = (props) => {

    return(
        <div id='outer-container'>
            <SideMenu />
            <main id='page-wrap'>
                <Header user={props.user} section={props.section}/>
                <MainContent>
                    {props.children}
                </MainContent>
            </main>
        </div>
        )
}

export default Layout

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 95%;
    overflow-y: scroll;
    background-color: #112;
    color: #9be;
`

