import QueenCard from "../../components/QueenCard/QueenCard"
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'
import * as episodeService from '../../services/eipsodeService.js'


const MyPicks = ({ user }) => {
  const [profiles, setProfiles] = useState([])
  const [episodes, setEpisodes] = useState([])

  let leagueNumber = 0
  function getLeagueNumber (user, profile) {
    if (user.user.profile === profile._id) {
      console.log("function profile: ", profile._id)
      console.log("function user: ", user.user.profile)
      leagueNumber = profile.league[0].leagueNo
      console.log("function leagueNumber",leagueNumber)
    }
  }
  profiles.forEach(profile => {
    getLeagueNumber({user}, profile)
  })

  let leagueEpisodes = []
  episodes.length ?
    episodes.map(episode => {
    if (episode.leagueNo === leagueNumber) {
      leagueEpisodes.push(episode)
    }})
    :
    <></>

  const [formData, setFormData] = useState({
    queen1: '',
    queen2: '',
    episodeNum: '',
  })

  useEffect(()=> {
    profileService.getAllProfiles()
    .then(profiles => setProfiles(profiles))
  }, [])

  useEffect(() => {
    episodeService.getAllEpisodes()
    .then(episodes => {
      console.log("episodes: ", episodes)
      setEpisodes(episodes)
    })
  }, [])

  const handleChange = evt => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    formData.episodeNum = leagueEpisodes.length + 1
    try {
      const data = await profileService.makeGuess(formData, user.profile)
      console.log("add to roster response: ", data)
      // setProfiles(data)
    } catch (err) {
      console.log(err)
    }
  }


  console.log("leagueEpisodes: ", leagueEpisodes)


    const { queen1 } = formData
    const { queen2 } = formData
    const { episodeNum } = formData

  let userProfile = {}
  profiles.length ?
  profiles?.forEach(profile => {
    if (profile._id === user.profile) {
      return userProfile = profile
    }
  })
  :
  userProfile = {}
  console.log("userProfile: ", userProfile)

  return ( 
    <>
      <div className="myroster">
        <h3>My Roster</h3>
        <form className="make-picks-form" onSubmit={handleSubmit}>
          <label htmlFor="queen1">Queen:</label>
          <select type="text" name="queen1" id="queen1" value={queen1} onChange={handleChange}>
            <option value="default">-Select From Roster-</option>
            {userProfile?.roster?.map(queen => {
              return <option value={queen.queen}>{queen.queen}</option>
            })}
          </select>
          <label htmlFor="queen2">Queen:</label>
          <select type="text" name="queen2" id="queen2" value={queen2} onChange={handleChange}>
            <option value="default">-Select From Roster-</option>
            {userProfile?.roster?.map(queen => {
              return <option value={queen.queen}>{queen.queen}</option>
            })}
          </select>
          <label htmlFor="queen2" display="none" hidden="true">Episode:</label>
          <input type="text" autoComplete="off" id="episodeNum" name="episodeNum" display="none" hidden="true" value={episodeNum} onChange={handleChange}/><br/>
          <button>Add Picks</button>
        </form>
      </div>
      <div className="make-guess">
        <h3>This Week's Picks</h3>
        <p>Episode: {leagueEpisodes.length + 1}</p>

      </div>
    </>
   );
}
 
export default MyPicks;