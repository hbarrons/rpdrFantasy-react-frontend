import QueenCard from "../../components/QueenCard/QueenCard"
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'
import * as episodeService from '../../services/eipsodeService.js'


const MyPicks = ({ user }) => {
  const [profiles, setProfiles] = useState([])
  const [episodes, setEpisodes] = useState([])


  // pick back up - start by working on functionality for weekly picks to default to previous week picks if no selection is made


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
    console.log("make guess data", formData)
    try {
      const data = await profileService.makeGuess(formData, user.profile)
      console.log("add to roster response: ", data)
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id === user.profile) {
          data[i].guessEpisode.push({
            queen1: formData.queen1,
            queen2: formData.queen2,
            episode: leagueEpisodes.length + 1
          })
          console.log("data[i]: ", data[i])
        }
      }
      setProfiles(data)
    } catch (err) {
      console.log(err)
    }
  }

  const updateGuess = async evt => {
    console.log(formData)
    evt.preventDefault()
    formData.episodeNum = leagueEpisodes.length + 1
    try {
      const data = await profileService.updateGuess(formData, user.profile)
      console.log("add to roster response: ", data)
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id === user.profile) {
          data[i].guessEpisode[data[i].guessEpisode.length - 1] = {
            queen1: formData.queen1,
            queen2: formData.queen2,
            episode: leagueEpisodes.length + 1
          }
          console.log("data[i]: ", data[i])
        }
      }
      setProfiles(data)
    } catch (err) {
      console.log(err)
    }
  }

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

  let guessInactive = false
  if (userProfile?.guessEpisode?.length === leagueEpisodes?.length + 1) {
    guessInactive = true
  } 
  console.log("guessInactive: ", guessInactive)

  
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
          {guessInactive ? ""
          :           
          <>
            <button className="btn btn-primary" disabled={guessInactive}>Add Picks</button>
          </>}
        </form>
        {guessInactive ? 
          <>
          <button className="btn btn-warning" onClick={updateGuess}>Change Current Picks</button>
          <p>Next Guess will be available once the League Admin adds the most recent episode results!</p>
          </>
          : ""}
      </div>
      <div>
      </div>
      <div className="make-guess">
        <h1 class="table-title">Weekly Guesses</h1>
        <table>
          <thead>
            <tr>
              <th>Episode</th>
              <th>Queen</th>
              <th>Queen</th>
            </tr>
          </thead>
          {userProfile?.guessEpisode?.map(guess => {
            return <>
              <tbody>
                <tr>
                  <td>{guess.episode}</td>
                  <td>{guess.queen1}</td>
                  <td>{guess.queen2}</td>
                </tr>
              </tbody>
            </>
          })}
        </table>
      </div>
    </>
   );
}
 
export default MyPicks;