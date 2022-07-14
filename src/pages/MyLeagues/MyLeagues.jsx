import LeagueCard from "../../components/LeagueCard/LeagueCard"
import { useState, useEffect } from 'react'
import * as episodeService from '../../services/eipsodeService.js'
import * as queenService from '../../services/queenService'
import * as profileService from '../../services/profileService'
import QueenCard from "../../components/QueenCard/QueenCard"
import PlayerCard from "../../components/PlayerCard/PlayerCard"
import AdminPlayerCard from "../../components/AdminPlayerCard/AdminplayerCard"
import Rules from "../../components/Rules/Rules"
import { Link } from "react-router-dom"
import './MyLeagues.css'


const MyLeague = ({ user }) => {
  const [episodes, setEpisodes] = useState([])
  const [queens, setQueens] = useState([])
  const [profiles, setProfiles] = useState([])

  //this application can be improved significantly by refactoring these hooks to get only the data necessary for each specific league, rather than getting ALL info and filtering on the client side.

  // API hook to get all profile data
  useEffect(()=> {
    profileService.getAllProfiles()
    .then(profiles => {
      setProfiles(profiles)
    })
  }, [])

  // API hook to get all queen data
  useEffect(() => {
    queenService.getAllQueens()
    .then(queens => {
      setQueens(queens)
    })
  }, [])

  // API hook to get all episode data
  useEffect(() => {
    episodeService.getAllEpisodes()
    .then(episodes => {
      setEpisodes(episodes)
    })
  }, [])

  //function to get user's league # in order to render correct league data
  let leagueNumber = 0
  function getLeagueNumber (user, profile) {
    if (user.user.profile === profile._id) {
      leagueNumber = profile.league[0]?.leagueNo
    }
  }
  profiles.forEach(profile => {
    getLeagueNumber({user}, profile)
  })

  //API call to /profile to remove queen from roster
  // const removeFromRoster = async (queen, user) => {
  //   try {
  //     const data = await profileService.removeFromRoster(queen, user)
  //     console.log("remove from roster response: ", data)
  //     for (let i=0; i < data.length; i++) {
  //       if (data[i]._id === user) {
  //         data[i].roster.forEach((rosterQueen, idx) => {
  //           if (rosterQueen.queen === queen)  {
  //             data[i].roster.splice(idx, 1)
  //             console.log(data[i].roster)
  //           }
  //         })
  //       }
  //     }
  //     setProfiles(data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  //API call to /profile to grant admin rights
  const makeAdmin = async (profileId) => {
    try {
      const data = await profileService.makeAdmin(profileId)
      // console.log("makeAdmin response: ", data)
      for (let i=0; i<data.length; i++) {
        if (data[i]._id === profileId) {
          data[i].league[0].isAdmin = true
        }
      }
      setProfiles(data)
    } catch (err) {
      console.log(err)
    }
  }

  //API call to /profile to remove admin rights
  const removeAdmin = async (profileId) => {
    try {
      const data = await profileService.removeAdmin(profileId)
      // console.log("removeAdmin response: ", data)
      for (let i=0; i<data.length; i++) {
        if (data[i]._id === profileId) {
          data[i].league[0].isAdmin = false
        }
      }
      setProfiles(data)
    } catch (err) {
      console.log(err)
    }
  }
  
  //helper function to get leagueEpisode information in order to calculate scores and render episode info to view
  let leagueEpisodes = []
  episodes.length ?
    episodes.map(episode => {
    if (episode.leagueNo === leagueNumber) {
      leagueEpisodes.push(episode)
    }})
    :
    console.log()
  




  return ( 
    <>
    <h1 className="myleague-title">My League Info</h1>
    <main className="myleague-main">
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
      <Rules />
      <div className="players">
        <h3 className="title">League Members</h3>
        {profiles?.map(profile => {
          if (user.profile === profile._id && profile.league[0]?.isAdmin === true) {
            return <>
              {profiles.map(profile => {
                if (profile.league[0]?.leagueNo === leagueNumber) {
                  return <AdminPlayerCard profile={profile} key={profile._id} makeAdmin={makeAdmin} removeAdmin={removeAdmin}/>
                }
              })}
            </>
          }
        })}
        {profiles?.map(profile => {
          if (user.profile === profile._id && profile.league[0]?.isAdmin === false) {
            return <>
              {profiles.map(profile => {
                if (profile.league[0]?.leagueNo === leagueNumber) {
                  return <PlayerCard profile={profile} key={profile._id}/>
                }
              })}
            </>
          }
        })}
      </div>
      {/* <div className="myroster">
        <h3>My Roster</h3>
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
      </div> */}
      <div className="recent-episode">
        {leagueEpisodes.length === 0 ?
        <>
          <h3 className="last-week">Last Week's Results</h3>
        </>
        :
        <>
          <div className="last-week">
            <h3 className="title">Last Week's Results</h3>
            <h3>Episode {leagueEpisodes[leagueEpisodes.length -1]?.number} </h3>
            <h5>Winner (10 points):</h5> <p className="result"> {leagueEpisodes[leagueEpisodes.length -1]?.winner} </p>
            <h5>Loser (-3 points): </h5><p className="result"> {leagueEpisodes[leagueEpisodes.length -1]?.loser} </p>
            <h5>Tops (5 points): </h5><p className="result"> {leagueEpisodes[leagueEpisodes.length -1]?.tops[0]}, {leagueEpisodes[leagueEpisodes.length -1]?.tops[1]}, {leagueEpisodes[leagueEpisodes.length -1]?.tops[2]} </p>
            <h5>Bottoms (-2 points):</h5> <p className="result"> {leagueEpisodes[leagueEpisodes.length -1]?.bottoms[0]}, {leagueEpisodes[leagueEpisodes.length -1]?.bottoms[1]}, {leagueEpisodes[leagueEpisodes.length -1]?.bottoms[2]}</p>
          </div>
        </>}
      </div>
      <div className="remaining-queens">
        <div>
          <h3 className="title">Remaining Queens:</h3>
          {queens.map(queen => {
            if (queen.eliminated === false && queen.leagueNo === leagueNumber) {
              return <li className="queenlist" key={queen._id}>{queen.name}</li>
            }
          })}
        </div>
        <div>
          <h3>Eliminated Queens:</h3>
          {queens.map(queen => {
            if (queen.eliminated === true && queen.leagueNo === leagueNumber) {
              return <li className="queenlist" key={queen._id}>{queen.name}</li>
            }
          })}
        </div>
      </div>
      
    </main>
    </>
   );
}
 
export default MyLeague;