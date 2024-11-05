import React from 'react'
import NavBar from '../landing/components/navbar'
import Footer from '../landing/components/footer'

function Layout({children}) {
  return (
    <div>
      <NavBar/>
      <main>{children}</main>
      <Footer/>
    </div>
  )
}

export default Layout
