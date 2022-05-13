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
      <h1>Hello. This is a list of all the profiles.</h1>
      {profiles.length ? 
        <>
          {profiles?.map(profile=>
            {if (profile.league[0].leagueNo === leagueNumber) {
              return <p key={profile._id}>{profile.name}</p>
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