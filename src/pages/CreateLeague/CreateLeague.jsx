import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as profileService from '../../services/profileService'
import styles from './CreateLeague.css'


const CreateLeague = ({ user }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    leagueName: '',
  })

  const handleChange = evt => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    })
  }

  let leagueNo = 0

  function createLeagueNo () {
    leagueNo = Math.floor(Math.random() * 10000000)
  } 

  const handleSubmit = async evt => {
    createLeagueNo()
    evt.preventDefault()
    try {
      await profileService.createLeague(formData.leagueName, leagueNo, user.profile)
      navigate('/myleague')
    } catch (err) {
      console.log(err)
    }
  }

  return ( 
    <>
      <h1 className='title'>Create a League</h1>
      <p className='createleague-info'>Note: Once you create a league, you will be the admin of the new league. Others can join your league by using the league number you will find on the "My League" page once it's created.</p>
      <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="create-league-form"
      >
        <label htmlFor="leagueName">League Name:</label>
        <input type="text" autoComplete="off" id="legueName" name="leagueName"
        onChange={handleChange}/>
        <div>
          <button className="create-league-btn btn">
           Sign Up
          </button>
          <Link to="/">
            <button className='btn'>Cancel</button>
          </Link>
        </div>
      </form>
    </>
   );
}
 
export default CreateLeague;