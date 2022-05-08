import QueenForm from "../../components/QueenForm/QueenForm";
import QueenCard from "../../components/QueenCard/QueenCard";
import { useState, useEffect } from 'react'
import * as queenService from '../../services/queenService'


const Queens = ({ profiles, user }) => {
  const [queens, setQueens] = useState([])

  useEffect(() => {
    queenService.getAllQueens()
    .then(queens => {
      console.log("useEffect: ", queens)
      setQueens(queens)
    })
  }, [])

  const [formData, setFormData] = useState({
    queen: '',
  })

  const handleChange = evt => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleDelete = async (queen) => {
    try {
      const data = await queenService.deleteQueen(queen)
      console.log("delete response: ", data)
      setQueens(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      const data = await queenService.createQueen(formData)
      console.log("create response: ", data)
      setQueens(data)
    } catch (err) {
      console.log(err)
    }
  }

  console.log(queens)

  return ( 
    <>
     <>
      {profiles.map(profile => 
        profile._id === user.profile ? 
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
      )}
    </>
      <div>
        <h1>Queens:</h1>
        {queens.length ? 
          <>
            {profiles.map(profile => {
          return <>
            {queens?.map(queen => {
              return <QueenCard queen={queen} profile={profile} user={user} key={queen._id} handleDelete={handleDelete}/>
            })}
          </>
        })}
          </>
          :
          <>No Queens</>
        }
      </div>
    </>
   );
}
 
export default Queens;