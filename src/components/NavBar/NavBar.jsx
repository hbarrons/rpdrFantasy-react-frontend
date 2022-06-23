import { Link, useNavigate, Navigate  } from 'react-router-dom'

import './NavBar.css'

const NavBar = ({ user, profiles, handleLogout }) => {
  // let userProfile = {}
  // profiles?.forEach(profile => {
  //   if (profile._id === user.profile) {
  //     return userProfile = profile
  //   }
  // })
  // console.log("userProfile: ", userProfile)
  return (
    <>
      {user ?
        <nav className="navbar navbar-expand-lg navbar-light ">
          <div className='container-fluid'>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className='container-fluid'>
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                  <li nav-item="true" className='nav-item'><Link to="/myleague" className='nav-link active'>My League</Link></li>
                  <li nav-item="true" className='nav-item'><Link to="/queens" className='nav-link active'>Queens</Link></li>
                  <li nav-item="true" className='nav-item'><Link to="/episodes" className='nav-link active'>Episodes</Link></li>
                  <li nav-item="true" className='nav-item'><Link to="/mypicks" className='nav-link active'>Make Picks</Link></li>
                  <li nav-item="true" className='nav-item'><Link to="/profiles" className='nav-link active'>Scoreboard</Link></li>
                  <li nav-item="true" className='nav-item'><Link to="" onClick={handleLogout} className='nav-link active'>LOG OUT</Link></li>
                  {/* <li nav-item="true"><Link to="/changePassword" className='nav-link active'>Change Password</Link></li> */}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      :
      <nav className='navbar navbar-fixed-top navbar-expand-lg navbar-dark navbar-custom'>
      <button
        className="navbar-toggler login-toggle-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className='container-fluid'>
          <ul className='navbar-nav'>
            <li nav-item="true"><Link to="/login" className='nav-link active'>Log In</Link></li>
            <li nav-item="true"><Link to="/signup" className='nav-link active'>Sign Up</Link></li>
          </ul>
        </div>
      </div>
    </nav>
      }
    </>
  )
}

export default NavBar
