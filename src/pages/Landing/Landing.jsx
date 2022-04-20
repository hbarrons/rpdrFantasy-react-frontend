import styles from './Landing.module.css'
import { Link } from 'react-router-dom'
import Rules from '../../components/Rules/Rules'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <h1>RuPaul's Drag Race Fantasy</h1>
      <Link to="/createleague" >Create a Fantasy League</Link>
      <Link to="/joinleague" >Join a Fantasy League</Link>
      <Rules />
    </main>
  )
}

export default Landing
