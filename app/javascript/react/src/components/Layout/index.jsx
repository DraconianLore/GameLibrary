import React from 'react'
import styled from 'styled-components'
import SideMenu from '../Menu'
import Header from '../Header'


const Layout = (props) => {

    return(
        <div id='outer-container'>
            <SideMenu />
            <main id='page-wrap'>
                <Header user={props.user} />
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
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    background-color: #592a03;
    color: #ff9b5f;
`

