import QueenCard from "../../components/QueenCard/QueenCard";
import { useState, useEffect } from 'react'
import * as queenService from '../../services/queenService'
import * as profileService from '../../services/profileService'
import { Link } from "react-router-dom";


const Queens = ({ user }) => {
  const [queens, setQueens] = useState([])
  const [profiles, setProfiles] = useState([])

  useEffect(()=> {
    profileService.getAllProfiles()
    .then(profiles => setProfiles(profiles))
  }, [])

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

  profiles.length ?
    profiles.forEach(profile => {
      getLeagueNumber({user}, profile)
    })
    :
    console.log("")

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

  const addToRoster = async (queen, user) => {
    console.log("user: ", user)
    try {
      const data = await profileService.addToRoster(queen, user)
      console.log("add to roster response: ", data)
      for (let i=0; i < data.length; i++) {
        if (data[i]._id === user) {
          data[i].roster.push({queen: queen})
        }
      }
      setProfiles(data)
    } catch (err) {
      console.log(err)
    }
  }

  const removeFromRoster = async (queen, user) => {
    try {
      const data = await profileService.removeFromRoster(queen, user)
      console.log("remove from roster response: ", data)
      for (let i=0; i < data.length; i++) {
        if (data[i]._id === user) {
          data[i].roster.forEach((rosterQueen, idx) => {
            if (rosterQueen.queen === queen)  {
              data[i].roster.splice(idx, 1)
              console.log(data[i].roster)
            }
          })
        }
      }
      setProfiles(data)
    } catch (err) {
      console.log(err)
    }
  }

  const { queenName } = formData


  return ( 
    <>
     <>
     {profiles.length ? 
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
      :
      <></>
      }
    </>
      <div>
      <p><Link to="/mypicks">Make Weekly Picks</Link></p>
        <h1>Queens:</h1>
        {queens.length ? 
          <>
          {profiles.length ? 
            <>
              {profiles?.map(profile => {
            return <>
              {queens?.map(queen => {
                if (queen.leagueNo === leagueNumber && queen.eliminated === false)
                return <QueenCard queen={queen} profile={profile} user={user} key={queen._id} handleDelete={handleDelete} addToRoster={addToRoster} removeFromRoster={removeFromRoster}/>
                 })}
               </>
              })}
            </>
            :
            <></>
          }
          <h3>Sashay'd Away</h3>
            {queens?.map(queen => {
              if (queen.leagueNo === leagueNumber && queen.eliminated === true)
              return <>
                <li>{queen.name}</li>
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