import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import * as profileService from './services/profileService'
import CreateLeague from './pages/CreateLeague/CreateLeague'
import JoinLeague from './pages/JoinLeague/JoineLeague'
import MyLeague from './pages/MyLeagues/MyLeagues'
import Queens from './pages/Queens/Queens'
import Episodes from './pages/Episodes/Episodes'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()
  const [profiles, setProfiles] = useState([])

  useEffect(()=> {
    profileService.getAllProfiles()
    .then(profiles => setProfiles(profiles))
  }, [])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/login')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar profiles={profiles} user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} profiles={profiles}/>} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route path="/createleague" element={<CreateLeague user={user}/>}/>
        <Route path="/joinleague" element={<JoinLeague user={user}/>}/>
        <Route path="/myleague" element={<MyLeague user={user}/>}/>
        <Route path="/queens" element={<Queens profiles={profiles} user={user}/>}/>
        <Route path="/episodes" element={<Episodes profiles={profiles} user={user}/>}>Episodes</Route>
        <Route
          path="/profiles"
          element={user ? <Profiles profiles={profiles} user={user}/> : <Navigate to="/login" />}
        />
        <Route
          path="/changePassword"
          element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  )
}

export default App
