import { useState } from 'react'

const CreateLeague = (props) => {
  const [formData, setFormData] = useState({
    leagueName: '',
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
      </form>
    </>
   );
}
 
export default CreateLeague;