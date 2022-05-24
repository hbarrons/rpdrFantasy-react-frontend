import styles from './Landing.module.css'
import { Link } from 'react-router-dom'
import Rules from '../../components/Rules/Rules'
import Leaguecard from '../../components/LeagueCard/LeagueCard'
import RuPaul from '../../pages/Landing/RuPaul.png'

const Landing = ({ user, profiles }) => {
  return (
    <main className={styles.container}>
      <h1>RuPaul's Drag Race Fantasy</h1>
      {console.log(profiles)}
      {console.log("user",user)}
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
         <h2>Start Your Engines</h2>
         <img src={RuPaul} alt="RuPaul's Face" />
         <h2>and may the Best Guesser, Win!</h2>
        </>
        :
        <>
         <h2>Start Your Engines</h2>
         <img src={RuPaul} alt="RuPaul's Face" />
         <h2>and may the Best Guesser, Win!</h2>
        </>
      }

      
    </main>
  )
}

export default Landing
