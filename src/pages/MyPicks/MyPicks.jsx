import QueenCard from "../../components/QueenCard/QueenCard"
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'
import * as episodeService from '../../services/eipsodeService.js'


const MyPicks = ({ user }) => {
  const [profiles, setProfiles] = useState([])
  const [episodes, setEpisodes] = useState([])

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
    console.log(leagueEpisodes)



  return ( 
    <>
      <div className="myroster">
        <h3>My Roster</h3>
        {profiles?.length ?
        <>{profiles?.map(profile => {
          if (user.profile === profile._id) {
            return profile.roster.map(queen => {
              return <>
                <li>{queen.queen}</li>
                <button className="btn btn-primary">Play</button>
              </>
            })
          }
        })}</>
        :
        <></>
        }
      </div>
      <div className="make-guess">
        <h3>This Week's Picks</h3>
        <p>Episode: {leagueEpisodes.length + 1}</p>

      </div>
    </>
   );
}
 
export default MyPicks;