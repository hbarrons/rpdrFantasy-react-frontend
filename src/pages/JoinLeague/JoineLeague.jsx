import { useState } from "react"

const JoinLeague = (props) => {
  const [formData, setFormData] = useState({
    leagueName: '',
    leagueNo: ''
  })

  const handleChange = evt => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = async evt => {
    console.log(evt)
  }

  return ( 
    <>
      <h1>Join League Here*</h1>
      <p>*You will need the League Number from the admin in order to join an existing league</p>
      <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="create-league-form"
      >
        <label htmlFor="leagueName">League Name:</label>
        <input type="text" autoComplete="off" id="legueName" name="leagueName"
        onChange={handleChange}/>
        <label htmlFor="leagueNo">League Number:</label>
        <input type="text" autoComplete="off" id="legueNo" name="leagueNo"
        onChange={handleChange}/>
      </form>
    </>
   );
}
 
export default JoinLeague;