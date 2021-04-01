import React from 'react'

function Navbar() {
  return (
    <nav className='navbar pt-4 pb-4'>
      <div className='navbar-brand is-align-items-center'>
        <div className='has-text-weight-bold is-size-4 pl-4 pr-4'>
          Wine Store
        </div>
        <button
          className='navbar-burger burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </button>
      </div>
      <div className='navbar-menu'>
        <div className='navbar-end'></div>
      </div>
    </nav>
  )
}

export default Navbar
