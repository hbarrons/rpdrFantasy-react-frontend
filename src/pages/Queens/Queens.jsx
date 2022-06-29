import QueenCard from "../../components/QueenCard/QueenCard";
import { useState, useEffect } from 'react'
import * as queenService from '../../services/queenService'
import * as profileService from '../../services/profileService'
import * as episodeService from '../../services/eipsodeService.js'
import styles from './Queens.css'
import { Link } from "react-router-dom";


const Queens = ({ user }) => {
  const [queens, setQueens] = useState([])
  const [profiles, setProfiles] = useState([])
  const [episodes, setEpisodes] = useState([])

  useEffect(()=> {
    profileService.getAllProfiles()
    .then(profiles => setProfiles(profiles))
  }, [])

  //IT WOULD CLEAN THE APP UP SIGNIFICANTLY IF I FILTERED OUT QUEENS/PROFILES/EPISODES FOR EACH SPECIFIC LEAGUE IN THE HOOK, RATHER THAN CONDITIONALLY IN THE JSX
  useEffect(() => {
    queenService.getAllQueens()
    .then(queens => {
      setQueens(queens)
    })
  }, [])

  let leagueNumber = 0
  function getLeagueNumber (user, profile) {
    if (user.user.profile === profile._id) {
      leagueNumber = profile.league[0].leagueNo
    }
  }

  useEffect(() => {
    episodeService.getAllEpisodes()
    .then(episodes => {
      setEpisodes(episodes)
    })
  }, [])


  let episodeNumber = 0
  function getEpisodeNumber (user) {
    console.log("user: ", user)
    profiles.map(profile => {
      if (user === profile._id) {
        episodeNumber = profile.score[profile.score.length - 1]?.episodeNum
        console.log("function episodeNumber",episodeNumber)
      }
    })
  }


  const [formData, setFormData] = useState({
    queen: '',
  })

  const handleChange = evt => {
    setFormData({
      // ...formData,
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


  profiles.length ?
    profiles.forEach(profile => {
      // console.log({user})
      getLeagueNumber({user}, profile)
    })
    :
    console.log()

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
    setFormData({queenName: undefined})
  }

  const addToRoster = async (queen, user) => {
    getEpisodeNumber(user)
    console.log({user})
    console.log("user: ", user)
    try {
      const data = await profileService.addToRoster(queen, user)
      console.log("add to roster response: ", data)
      // for (let i=0; i < data.length; i++) {
      //   if (data[i]._id === user) {
      //     data[i].roster.push({queen: queen})
      //   }
      // }
      setProfiles(data)
    } catch (err) {
      console.log(err)
    }
  }


  const removeFromRoster = async (queen, user) => {
    console.log("queen: ", queen, "user: ", user)

    let rosterCount = 0

    profiles.map(profile => {
      if (profile._id === user) {
        console.log("profile.roster.length: ", profile.roster.length)
        rosterCount = profile.roster.length
      }
    })
    console.log("rosterCount: ", rosterCount)

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

    if (rosterCount === 4) {
      try {
        const data = await profileService.weeklyDrop(user)
        console.log("weeklyDrop response: ", data)
        for (let i=0; i<data.length; i++) {
          if (data[i]._id === user) {
            console.log("data[i]: ", data[i])
            data[i].weeklyDrop = true
          }
        }
        setProfiles(data)
      } catch (err) {
        console.log(err)
      }
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
              <div className="add-queen">
                <h2>Admin Feature</h2>
                  <h3>Add A Queen</h3>
                  <form
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    className="add-queen-form"
                    >
                      <label htmlFor="queen">Queen Name:</label>
                      <input key={profile._id} type="text" autoComplete="off" id="queen" name="queen" value={queenName}
                      onChange={handleChange}/>
                      <div>
                        <button className="btn btn-primary">
                        Add Queen
                        </button>
                      </div>
                    </form>
              </div>
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
        <h1 className="title">Queens</h1>
        {queens.length ? 
          <>
          {profiles.length ? 
            <>
              {profiles?.map(profile => {
            return <>
              <div className="queens">
                {queens?.map(queen => {
                if (queen.leagueNo === leagueNumber && queen.eliminated === false)
                return <QueenCard queen={queen} profile={profile} user={user} key={queen._id} handleDelete={handleDelete} addToRoster={addToRoster} removeFromRoster={removeFromRoster}/>
                })}
              </div>
               </>
              })}
            </>
            :
            <></>
          }
          <div className="sashay">
            <h3 className="title">Sashay'd Away</h3>

              {profiles.map(profile => {
                return <>
                  <div className="queens">
                  {queens?.map(queen => {
                  if (queen.leagueNo === leagueNumber && queen.eliminated === true) {
                    return <QueenCard queen={queen} profile={profile} user={user} key={queen._id} handleDelete={handleDelete} addToRoster={addToRoster} removeFromRoster={removeFromRoster}/>
                  }
              })}
                  </div>
                </>

              })}

          </div>
          </>
          :
          <>No Queens</>
        }
      </div>
    </>
   );
}
 
export default Queens;