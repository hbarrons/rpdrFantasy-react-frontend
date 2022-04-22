import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as queenService from '../../services/queenService'


const QueenForm = ({ profile, user}) => {
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

  const handleSubmit = async evt => {
    console.log("sanity")
  }

  return ( 
    <>
      {profile._id === user.profile ? 
        <>
          {profile.league[0]?.isAdmin ? 
            <>
              <h1>Add A Queen:</h1>
              <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className="create-league-form"
                >
                  <label htmlFor="queen">Queen Name:</label>
                  <input type="text" autoComplete="off" id="queen" name="queen"
                  onChange={handleChange}/>
                  <div>
                    <button className="create-league-btn">
                    Add Queen
                    </button>
                  </div>
                </form>
            </>
          :
            <></>
          }
          
        </>
        :
        <></>
      }
    </>
  );
}
 
export default QueenForm;