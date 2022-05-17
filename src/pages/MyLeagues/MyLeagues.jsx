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
  
  let leagueEpisodes = []
  episodes.length ?
    episodes.map(episode => {
    if (episode.leagueNo === leagueNumber) {
      leagueEpisodes.push(episode)
    }})
    :
    console.log(leagueEpisodes)
  

  console.log("leagueEpisodes: ", leagueEpisodes)


  return ( 
    <>
      <h1>My League Info</h1>
      <div className="league-info">
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
      </div>
      <div className="rules">
        <Rules />
      </div>
      <div className="myroster">
        <h3>My Roster</h3>
        <p><Link to="/mypicks">Make Weekly Picks</Link></p>
        {profiles?.length ?
        <>{profiles?.map(profile => {
          if (user.profile === profile._id) {
            return profile.roster.map(queen => {
              return <><QueenCard profile={profile} user={user} queen={queen} removeFromRoster={removeFromRoster}/></>
            })
          }
        })}</>
        :
        <></>
        }
      </div>
      <div className="recent-episode">
        <h3>Last Week's Results:</h3>
        <h3>Episode {leagueEpisodes[leagueEpisodes.length -1]?.number} </h3>
        <h5>Winner: {leagueEpisodes[leagueEpisodes.length -1]?.winner} (10 points)</h5>
        <h5>Loser: {leagueEpisodes[leagueEpisodes.length -1]?.loser} (-3 points)</h5>
        <h5>Tops: {leagueEpisodes[leagueEpisodes.length -1]?.tops[0]}, {leagueEpisodes[leagueEpisodes.length -1]?.tops[1]}, {leagueEpisodes[leagueEpisodes.length -1]?.tops[2]} (5 points)</h5>
        <h5>Bottoms: {leagueEpisodes[leagueEpisodes.length -1]?.bottoms[0]}, {leagueEpisodes[leagueEpisodes.length -1]?.bottoms[1]}, {leagueEpisodes[leagueEpisodes.length -1]?.bottoms[2]} (-2 points)</h5>
      </div>
      <div className="allqueens">
        <div>
          <h3 className="remaining-queens">Remaining Queens:</h3>
          {queens.map(queen => {
            console.log(queen.eliminated)
            if (queen.eliminated === false && queen.leagueNo === leagueNumber) {
              return <li>{queen.name}</li>
            }
          })}
        </div>
        <div className="elim-queens">
          <h3>Eliminated Queens:</h3>
          {queens.map(queen => {
            console.log(queen.eliminated)
            if (queen.eliminated === true && queen.leagueNo === leagueNumber) {
              return <li>{queen.name}</li>
            }
          })}
        </div>
      </div>
    </>
   );
}
 
export default MyLeague;