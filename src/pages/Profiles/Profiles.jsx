import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as profileService from '../../services/profileService'
import * as episodeService from '../../services/eipsodeService.js'
import styles from './profiles.css'
import ProfileDetails from '../../components/ProfileDetailsCard/ProfileDetailsCard'


const Profiles = ({ user }) => {
  const [episodes, setEpisodes] = useState([])
  const [profiles, setProfiles] = useState([])


  useEffect(()=> {
    profileService.getAllProfiles()
    .then(profiles => {
      setProfiles(profiles)
    })
  }, [])

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
                  return <th>Episode {episode.epNum}</th>
                }
              })}
            <th className='total-score'>Total</th>  
          </tr>
        {profiles?.map(profile => {
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
        <div className='allplayers'>
          {profiles?.map(profile=>
            {if (profile.league[0]?.leagueNo === leagueNumber) {
              return <ProfileDetails profile={profile} />
            }}
          )}
        </div>
        </>
      :
        <></>
      }
      
    </>

  )
}
 
export default Profiles