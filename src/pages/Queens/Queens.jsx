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


  let leagueNumber = 0
  function getLeagueNumber (user, profile) {
    if (user.user.profile === profile._id) {
      console.log("function profile: ", profile._id)
      console.log("function user: ", user.user.profile)
      leagueNumber = profile.league[0].leagueNo
      console.log("function leagueNumber",leagueNumber)
    }
  }
  console.log("leagueNumber: ", leagueNumber)

  profiles.forEach(profile => {
    getLeagueNumber({user}, profile)
  })

  const handleSubmit = async evt => {
    console.log("submit leagueNumber",leagueNumber)
    evt.preventDefault()
    try {
      const data = await queenService.createQueen(formData, leagueNumber)
      for (let i=0; i < data.queens.length; i++) {
        if (data.queens[i]._id === data.queen._id) {
          data.queens[i].name = data.queen.name
        }
      }
      console.log("create response: ", data.queens)
      setQueens(data.queens)
    } catch (err) {
      console.log(err)
    }
    setFormData({queenName: ""})
  }

  const { queenName } = formData


  return ( 
    <>
     <>
      {profiles?.map(profile => 
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
                  <input type="text" autoComplete="off" id="queen" name="queen" value={queenName}
                  onChange={handleChange}/>
                  <div>
                    <button className="btn btn-primary">
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
            {profiles?.map(profile => {
          return <>
            {queens?.map(queen => {
              if (queen.leagueNo === leagueNumber)
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