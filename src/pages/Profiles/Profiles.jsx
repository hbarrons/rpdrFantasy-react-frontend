import { useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'

const Profiles = ({ profiles }) => {


  return (
    <>
      <h1>Hello. This is a list of all the profiles.</h1>
      {profiles.length ? 
        <>
          {profiles.map(profile=>
            <p key={profile._id}>{profile.name}</p>
          )}
        </>
      :
        <p>No profiles yet</p>
      }
    </>
  )
}
 
export default Profiles