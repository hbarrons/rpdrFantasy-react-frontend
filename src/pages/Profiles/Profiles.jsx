import { useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'
import * as episodeService from '../../services/eipsodeService.js'
import styles from './profiles.css'

const Profiles = ({ profiles, user }) => {
  const [episodes, setEpisodes] = useState([])


  useEffect(() => {
    episodeService.getAllEpisodes()
    .then(episodes => {
      setEpisodes(episodes)
    })
  }, [])

  let leagueNumber = 0
  function getLeagueNumber (user, profile) {
    if (user.user.profile === profile._id) {
      leagueNumber = profile.league[0].leagueNo
    }
  }
  profiles.length ?
  profiles?.forEach(profile => {
    getLeagueNumber({user}, profile)
  })
  :
  console.log(profiles)

  
  
  
  return (
    <>
    <h1 className='title'>Scoreboard</h1>
    <div className='scoreboard'>
        <table>
          <tr>
            <th>Player</th>
              {episodes.map(episode => {
                if (episode.leagueNo === leagueNumber) {
                  return <th>Episode {episode.number}</th>
                }
              })}
            <th className='total-score'>Total</th>  
          </tr>
        {profiles.map(profile => {
          if (profile.league[0]?.leagueNo === leagueNumber) {
            return <>
              <tr>
                <td>{profile.name}</td>
                {profile.score.map(weeklyScore => {
                  return <>
                    <td>{weeklyScore.score}</td>
                  </>
                })}
                <td className='total-score'>{profile.totalScore}</td>
              </tr>
            </>
          }
        })}
        </table>
      </div>

      <h1 className='title'>Players</h1>
      {profiles.length ? 
        <>
        <div className='players'>
          {profiles?.map(profile=>
            {if (profile.league[0]?.leagueNo === leagueNumber) {
              return <>
              <div className='container player-card'>
                <div>
                  <h2>{profile.name}</h2>
                  <h6>{profile.totalScore}</h6>
                </div>
                <h5>Roster:</h5>
                {profile.roster.map(queen => {
                  return <><li>{queen.queen}</li>
                  </>
                })}
                <h5>Weekly Picks: Episode {profile.guessEpisode.length}</h5>
                <li>{profile.guessEpisode[profile.guessEpisode.length-1].queen1}</li>
                <li>{profile.guessEpisode[profile.guessEpisode.length-1].queen2}</li>
              </div>
              </>
            }}
          )}
        </div>
        </>
      :
        <p></p>
      }
      
    </>

  )
}
 
export default Profiles