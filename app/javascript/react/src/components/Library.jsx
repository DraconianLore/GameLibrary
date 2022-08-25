import * as React from 'react'  
import Home from './Home'
import Header from './Header'

const Library = (props) => {    

  return (
    <>
      <Header user={props.user} />
      <Home />
    </>
  )
}                                                       

export default Library;
