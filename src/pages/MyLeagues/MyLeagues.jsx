import LeagueCard from "../../components/LeagueCard/LeagueCard"
import { useState, useEffect } from 'react'
import * as episodeService from '../../services/eipsodeService.js'
import * as queenService from '../../services/queenService'


const MyLeague = ({ profiles, user }) => {
  const [episodes, setEpisodes] = useState([])
  const [queens, setQueens] = useState([])

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


  return ( 
    <>
      <h1>My League Info</h1>
      {profiles.length ?
        <>
          {profiles.map(profile => {
          return <LeagueCard profile={profile} user={user}/>
          })}
        </>
        :
        <>
        </>
      }
      <div>
        <h3>My Roster</h3>
        {profiles?.length ?
        <>{profiles?.map(profile => {
          if (user.profile === profile._id) {
            console.log(profile.roster)
           return profile.roster.map(queen => {
            //   console.log("queen roster:", queen.queen)
              return <li>{queen.queen}</li>
            })
          }
        })}</>
        :
        <></>
        }
      </div>
      <div>
        <h3>Last Weeks Episode Results:</h3>
        {episodes.length ?
          <>
            {console.log("newest episode: ",episodes[episodes.length - 1])}
            <h3>Episode {episodes[episodes.length - 1].number} </h3>
            <h5>Winner: {episodes[episodes.length - 1].winner} (10 points)</h5>
            <h5>Loser: {episodes[episodes.length - 1].loser} (-3 points)</h5>
            <h5>Tops: {episodes[episodes.length - 1].tops[0]}, {episodes[episodes.length - 1].tops[1]}, {episodes[episodes.length - 1].tops[2]} (5 points each)</h5>
            <h5>Bottoms: {episodes[episodes.length - 1].bottoms[0]}, {episodes[episodes.length - 1].bottoms[1]}, {episodes[episodes.length - 1].bottoms[2]} (-2 points)</h5>
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