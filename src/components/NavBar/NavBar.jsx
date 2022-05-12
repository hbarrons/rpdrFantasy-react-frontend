import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <>
      {user ?
        <nav class="navbar navbar-expand-lg navbar-light ">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className='container-fluid'>
              <ul className='navbar-nav'>
                <li nav-item="true"><Link to="/" className='nav-link active'>Home</Link></li>
                <li nav-item="true"><Link to="/myleague" className='nav-link active'>My League</Link></li>
                <li nav-item="true"><Link to="/queens" className='nav-link active'>Queens</Link></li>
                <li nav-item="true"><Link to="/episodes" className='nav-link active'>Episodes</Link></li>
                <li nav-item="true"><Link to="/profiles" className='nav-link active'>Profiles</Link></li>
                <li nav-item="true"><Link to="" onClick={handleLogout} className='nav-link active'>LOG OUT</Link></li>
                <li nav-item="true"><Link to="/changePassword" className='nav-link active'>Change Password</Link></li>
              </ul>
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
