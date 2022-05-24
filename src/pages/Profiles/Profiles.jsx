import { useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'

const Profiles = ({ profiles, user }) => {

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
      <h1>Players</h1>
      {profiles.length ? 
        <>
          {profiles?.map(profile=>
            {if (profile.league[0]?.leagueNo === leagueNumber) {
              console.log(profile)
              return <>
                <h2>{profile.name} (score here)</h2>
                <h5>Roster:</h5>
                {profile.roster.map(queen => {
                  return <><li>{queen.queen}</li>
                  </>
                })}
                <h5>Weekly Picks: Episode {profile.guessEpisode.length}</h5>
                <li>{profile.guessEpisode[profile.guessEpisode.length-1].queen1}</li>
                <li>{profile.guessEpisode[profile.guessEpisode.length-1].queen2}</li>
              </>
            }}
          )}
        </>
      :
        <p></p>
      }
    </>
  )
}
 
export default Profiles