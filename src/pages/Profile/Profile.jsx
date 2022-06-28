import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import * as profileService from '../../services/profileService'

const Profile = (props) => {
  let location = useLocation()
  const [profiles, setProfiles] = useState([])

  useEffect(()=> {
    profileService.getAllProfiles()
    .then(profiles => setProfiles(profiles))
  }, [])

  let profile
  profile = location.state

  console.log(profile)
  return ( 
    <>
      <h1 className="title">{profile.name}'s Profile</h1>
      <h5 className="title">{profile.totalScore} points</h5>
      <div className="current-roster">
        <h4>Roster</h4>
        {profile.roster.map(queen => {
          return <>
            <li>{queen.queen}</li>
          </>
        })}
      </div>
      <div className="Weekly Picks">
        <h4>Weekly Guesses</h4>
        {profile.guessEpisode.map(guess => {
          return <>
            <h5>Episode: {guess.episode}</h5>
            <li>{guess.queen1}</li>
            <li>{guess.queen2}</li>
          </>
        })}
      </div>
    </>
   );
}
 
export default Profile;