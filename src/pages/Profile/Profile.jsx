import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import * as profileService from '../../services/profileService'

const Profile = ({ user }) => {
  let location = useLocation()
  const [profiles, setProfiles] = useState([])

  useEffect(()=> {
    profileService.getAllProfiles()
    .then(profiles => setProfiles(profiles))
  }, [])

  let profile
  profile = location.state

  let leagueNumber = 0
  function getLeagueNumber (user, profile) {
    if (user.user.profile === profile._id) {
      leagueNumber = profile.league[0].leagueNo
    }
  }

  profiles.length ?
  profiles.forEach(profile => {
    getLeagueNumber({user}, profile)
  })
  :
  console.log("")

  const unlockRoster = async (profileId, leagueNum) => {
    console.log("unlock: ", profileId, leagueNum)
    try {
      const data = await profileService.unlockRoster(profileId, leagueNumber)
      console.log("update weekly drop response: ", data)
      for (let i=0; i<data.length; i++){
        if (data[i].league[0].leagueNo === leagueNumber) {

          data[i].weeklyDrop = false
        }
      }
      // setProfiles(data)
    } catch (err) {
      console.log(err)
    }
  }


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
        {profiles.map(mapProfile => {
        if (mapProfile.league[0].leagueNo === leagueNumber && mapProfile.league[0].isAdmin === true) {
          if (profile.weeklyDrop === true) {
            console.log(profile._id, leagueNumber)
            return <>
              <button className="btn" onClick={() => unlockRoster(profile._id, leagueNumber)}>Unlock Roster</button>
            </>
          }
        }
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