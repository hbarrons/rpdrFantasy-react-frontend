import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import * as profileService from '../../services/profileService'
import './Profile.css'

const Profile = ({ user }) => {
  let location = useLocation()
  const [profiles, setProfiles] = useState([])

  useEffect(()=> {
    profileService.getAllProfiles()
    .then(profiles => setProfiles(profiles))
  }, [])

  let profile
  profile = location.state
  profiles.map(mapProfile => {
    if (mapProfile._id === location.state._id) {
      profile = mapProfile
    }
  })

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
  console.log()

  const unlockRoster = async (profileId, leagueNum) => {
    // console.log("unlock: ", profileId, leagueNum)
    try {
      const data = await profileService.unlockRoster(profileId, leagueNumber)
      
      for (let i=0; i<data.length; i++){
        if (data[i]._id === profileId) {
          data[i].weeklyDrop = false
          profile = data[i]
        }
      }
      // console.log("unlock response: ", data)
      setProfiles(data)
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
        </div>
        {profiles.map(mapProfile => {
        if (mapProfile.league[0]?.leagueNo === leagueNumber && mapProfile.league[0]?.isAdmin === true) {
            return <>
            {profile.weeklyDrop === true ?
            <>
            <div className="admin-unlock">
              <p>Admin Feature: if player experienced an error with their roster, you can unlock it and allow them a new pick</p>
              <button className="btn btn-warning unlock-btn" onClick={() => unlockRoster(profile._id, leagueNumber)}>Unlock Roster</button>
            </div>
            </>
            :
            <></>
            }
            </>

        }
      })}

      <h4 className="title">Weekly Guesses</h4>
      <div className="guess-table">
        <table>
          <tr>
            <th>Episode</th>
            <th>Queen</th>
            <th>Queen</th>
          </tr>
        {profile.guessEpisode.map(guess => {
          return <>
            <tr>
              <td>{guess.episode}</td>
              <td>{guess.queen1}</td>
              <td>{guess.queen2}</td>
            </tr>
          </>
        })}
        </table>
      </div>
    </>
   );
}
 
export default Profile;