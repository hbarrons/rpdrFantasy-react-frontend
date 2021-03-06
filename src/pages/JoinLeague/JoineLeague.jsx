import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import * as profileService from '../../services/profileService'
import './JoinLeague.css'


const JoinLeague = ({ user }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    leagueNo: ''
  })

  const handleChange = evt => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      await profileService.joinLeague(formData, user.profile)
      navigate('/myleague')
    } catch (err) {
      console.log(err)
    }
  }


  return ( 
    <>
      <h1 className="title">Join League</h1>
      <p>Note: You will need the League Name and Number from the League Admin in order to join an existing league</p>
      <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="create-league-form"
      >
        <label htmlFor="leagueName">League Name: </label>
        <input type="text" autoComplete="off" id="leagueName" name="leagueName" onChange={handleChange}/><br/>
        <label htmlFor="leagueNo">League Number: </label>
        <input type="text" autoComplete="off" id="legueNo" name="leagueNo"
        onChange={handleChange}/>
        <div>
          <button className="create-league-btn btn btn-primary">
           Sign Up
          </button>
          <Link to="/" >
            <button className="btn btn-warning">Cancel</button>
          </Link>
        </div>
      </form>
    </>
   );
}
 
export default JoinLeague;