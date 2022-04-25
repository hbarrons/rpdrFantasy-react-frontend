import { useState } from 'react'
import * as queenService from '../../services/queenService'


const QueenForm = ({ profile, user}) => {
  const [formData, setFormData] = useState({
    queen: '',
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
      await queenService.createQueen(formData)
    } catch (err) {
      console.log(err)
    }
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
                className="add-queen-form"
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