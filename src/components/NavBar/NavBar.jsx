import { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate  } from 'react-router-dom'
import * as profileService from '../../services/profileService'
import './NavBar.css'

const NavBar = ({ profiles, user, handleLogout }) => {


  return (
    <>
      {user ?
      <>
      {profiles.length ? <>
        {profiles?.map(profile => {
          if (user.profile === profile._id) {
            if (profile.league.length === 0) {
              return <>
                <nav className='navbar navbar-fixed-top navbar-expand-lg navbar-dark navbar-custom'>
                      <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <h5 className='navtitle'>RuPaul's Drag Race Fantasy</h5>
                      <div className="collapse navbar-collapse" id="navbarNav">
                        <div className='container-fluid'>
                          <ul className='navbar-nav'>
                            <li nav-item="true" className='nav-item'><Link to="" onClick={handleLogout} className='nav-link active' id="navlink">LOG OUT</Link></li>
                          </ul>
                        </div>
                      </div>
                      </nav>
              </>
            } else {
             return <>
                <nav className="navbar navbar-fixed-top navbar-expand-lg navbar-light ">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="#navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <h5 className='navtitle'>RuPaul's Drag Race Fantasy</h5>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <div className='container-fluid' id="navbarNav">
                      <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li nav-item="true" className='nav-item'><Link to="/myleague" className='nav-link active' id="navlink">My League</Link></li>
                        <li nav-item="true" className='nav-item'><Link to="/queens" className='nav-link active' id="navlink">Build Roster</Link></li>
                        <li nav-item="true" className='nav-item'><Link to="/mypicks" className='nav-link active' id="navlink">Make Guess</Link></li>
                        <li nav-item="true" className='nav-item'><Link to="/episodes" className='nav-link active' id="navlink">Episodes</Link></li>
                        <li nav-item="true" className='nav-item'><Link to="/profiles" className='nav-link active' id="navlink">Scoreboard</Link></li>
                        <li nav-item="true" className='nav-item'><Link to="" onClick={handleLogout} className='nav-link active' id="navlink">LOG OUT</Link></li>
                      </ul>
                    </div>
                  </div>
              </nav>
              </>
            }
          }
        })}
      </> : 
      <>
        <nav className='navbar navbar-fixed-top navbar-expand-lg navbar-dark navbar-custom'>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          id="toggle-button"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <h5 className='navtitle'>RuPaul's Drag Race Fantasy</h5>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className='container-fluid'>
            <ul className='navbar-nav'>
              <li nav-item="true"><Link to="/login" className='nav-link active' id="navlink">Log In</Link></li>
              <li nav-item="true"><Link to="/signup" className='nav-link active' id="navlink">Sign Up</Link></li>
              <li nav-item="true"><Link to="/changePassword" className='nav-link active' id="navlink">Change Password</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      </>}
      </>
      :
      <nav className='navbar navbar-fixed-top navbar-expand-lg navbar-dark navbar-custom'>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <h5 className='navtitle'>RuPaul's Drag Race Fantasy</h5>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className='container-fluid'>
          <ul className='navbar-nav'>
            <li nav-item="true"><Link to="/login" className='nav-link active' id="navlink">Log In</Link></li>
            <li nav-item="true"><Link to="/signup" className='nav-link active' id="navlink">Sign Up</Link></li>
            <li nav-item="true"><Link to="/changePassword" className='nav-link active' id="navlink">Change Password</Link></li>
          </ul>
        </div>
      </div>
      </nav>
    }
    </>
  )
}

export default NavBar
