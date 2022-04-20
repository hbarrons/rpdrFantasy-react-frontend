import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as profileService from '../../services/profileService'


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
      await profileService.createLeague(formData.leagueName, leagueNo, user._id)
      // navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return ( 
    <>
      <h1>Create League Here*</h1>
      <p>*You will be the admin of the new league</p>
      <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="create-league-form"
      >
        <label htmlFor="leagueName">League Name:</label>
        <input type="text" autoComplete="off" id="legueName" name="leagueName"
        onChange={handleChange}/>
        <div>
          <button className="create-league-btn">
           Sign Up
          </button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </>
   );
}
 
export default CreateLeague;