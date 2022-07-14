import styles from './Landing.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Rules from '../../components/Rules/Rules'
import Leaguecard from '../../components/LeagueCard/LeagueCard'
import RuPaul from '../../pages/Landing/RuPaul.png'
import * as profileService from '../../services/profileService'

const Landing = ({ user }) => {
  const [profiles, setProfiles] = useState([])


  useEffect(()=> {
    profileService.getAllProfiles()
    .then(profiles => {
      setProfiles(profiles)
    })
  }, [])

  return (
    <main className={styles.container}>
      {profiles?.length ? 
        <>
        {profiles?.map(profile => {
        if (profile?._id === user?.profile) {
          if (profile?.league.length === 0) {
           return <>
              <Link to="/createleague" >Create a Fantasy League</Link>
              <Link to="/joinleague" >Join a Fantasy League</Link>
            </>
          }
        }
         })}
         <h2 className='title'>Start Your Engines</h2>
         <img src={RuPaul} alt="RuPaul's Face" />
         <h2 className='title'>and may the Best Guesser, Win!</h2>
        </>
        :
        <>
         <h2 className='title'>Start Your Engines</h2>
         <img src={RuPaul} alt="RuPaul's Face" />
         <h2 className='title'>and may the Best Guesser, Win!</h2>
        </>
      }

      
    </main>
  )
}

export default Landing
