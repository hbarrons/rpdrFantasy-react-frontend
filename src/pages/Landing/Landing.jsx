import styles from './Landing.module.css'
import { Link } from 'react-router-dom'
import Rules from '../../components/Rules/Rules'
import LeagueCard from '../../components/LeagueCard/LeagueCard'
import Leaguecard from '../../components/LeagueCard/LeagueCard'

const Landing = ({ user, profiles }) => {
  return (
    <main className={styles.container}>
      <h1>RuPaul's Drag Race Fantasy</h1>
      {console.log(profiles)}
      {console.log("user",user)}
      {profiles?.length ? 
        <>
        {profiles?.map(profile => {
        if (profile?._id === user.profile) {
          console.log("this is user", profile)
          if (profile.league.length === 0) {
           return <>
              <Link to="/createleague" >Create a Fantasy League</Link>
              <Link to="/joinleague" >Join a Fantasy League</Link>
            </>
          }
        }
         })}
        </>
        :
        <>No Profiles</>
      }
      
      <Rules />
    </main>
  )
}

export default Landing
