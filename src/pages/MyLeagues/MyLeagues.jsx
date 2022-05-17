import LeagueCard from "../../components/LeagueCard/LeagueCard"
import { useState, useEffect } from 'react'
import * as episodeService from '../../services/eipsodeService.js'
import * as queenService from '../../services/queenService'
import * as profileService from '../../services/profileService'
import QueenCard from "../../components/QueenCard/QueenCard"
import Rules from "../../components/Rules/Rules"
import { Link } from "react-router-dom"


const MyLeague = ({ user }) => {
  const [episodes, setEpisodes] = useState([])
  const [queens, setQueens] = useState([])
  const [profiles, setProfiles] = useState([])

  useEffect(()=> {
    profileService.getAllProfiles()
    .then(profiles => setProfiles(profiles))
  }, [])

  useEffect(() => {
    queenService.getAllQueens()
    .then(queens => {
      console.log("queens: ", queens)
      setQueens(queens)
    })
  }, [])

  useEffect(() => {
    episodeService.getAllEpisodes()
    .then(episodes => {
      console.log("episodes: ", episodes)
      setEpisodes(episodes)
    })
  }, [])

  let leagueNumber = 0
  function getLeagueNumber (user, profile) {
    if (user.user.profile === profile._id) {
      console.log("function profile: ", profile._id)
      console.log("function user: ", user.user.profile)
      leagueNumber = profile.league[0].leagueNo
      console.log("function leagueNumber",leagueNumber)
    }
  }
  profiles.forEach(profile => {
    getLeagueNumber({user}, profile)
  })

  const addToRoster = async (queen, user) => {
    console.log("user: ", user)
    try {
      const data = await profileService.addToRoster(queen, user)
      console.log("add to roster response: ", data)
      setProfiles(data)
    } catch (err) {
      console.log(err)
    }
  }

  const removeFromRoster = async (queen, user) => {
    console.log("sanity")
    try {
      const data = await profileService.removeFromRoster(queen, user)
      console.log("remove from roster response: ", data)
      setProfiles(data)
    } catch (err) {
      console.log(err)
    }
  }
  

  


  return ( 
    <>
      <h1>My League Info</h1>
      {profiles.length ?
        <>
          {profiles?.map(profile => {
          return <LeagueCard profile={profile} user={user}/>
          })}
        </>
        :
        <>
        </>
      }
      <div>
        <Rules />
      </div>
      <div>
        <h3>My Roster</h3>
        {profiles?.length ?
        <>{profiles?.map(profile => {
          if (user.profile === profile._id) {
            return profile.roster.map(queen => {
              return <><QueenCard profile={profile} user={user} queen={queen} addToRoster={addToRoster} removeFromRoster={removeFromRoster}/></>
            })
          }
        })}</>
        :
        <></>
        }
      </div>
      <div>
        <h3>Episode Results:</h3>
        {episodes.length ?
          <>
          {episodes.map(episode => {
            if (episode.leagueNo === leagueNumber) {
              return <>
                {console.log(episode)}
                <h3>Episode {episode.number} </h3>
                <h5>Winner: {episode.winner} (10 points)</h5>
                <h5>Loser: {episode.loser} (-3 points)</h5>
                <h5>Tops: {episode.tops[0]}, {episode.tops[1]}, {episode.tops[2]} (5 points)</h5>
                <h5>Bottoms: {episode.bottoms[0]}, {episode.bottoms[1]}, {episode.bottoms[2]} (-2 points)</h5>
              </>
            }
          })}

          </>
          :
          <></>
        }
      </div>
      <div>
        <h3>Remaining Queens:</h3>
        {queens.map(queen => {
          console.log(queen.eliminated)
          if (queen.eliminated === false && queen.leagueNo === leagueNumber) {
            return <li>{queen.name}</li>
          }
        })}
      </div>
      <div>
        <h3>Eliminated Queens:</h3>
        {queens.map(queen => {
          console.log(queen.eliminated)
          if (queen.eliminated === true && queen.leagueNo === leagueNumber) {
            return <li>{queen.name}</li>
          }
        })}
      </div>
    </>
   );
}
 
export default MyLeague;