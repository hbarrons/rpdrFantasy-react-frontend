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
          {profiles?.map(profile => {
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
              return <>
                <li>{queen.queen}</li>
                <button className="btn btn-danger">Remove</button>
              </>
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