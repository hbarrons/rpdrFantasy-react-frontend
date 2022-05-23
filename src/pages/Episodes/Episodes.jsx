import { useState, useEffect } from 'react'
import * as episodeService from '../../services/eipsodeService.js'
import * as queenService from '../../services/queenService'
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard.jsx'

const Episodes = ({ profiles, user }) => {
  const [episodes, setEpisodes] = useState([])
  const [queens, setQueens] = useState([])

  useEffect(() => {
    queenService.getAllQueens()
    .then(queens => {
      setQueens(queens)
    })
  }, [])

  useEffect(() => {
    episodeService.getAllEpisodes()
    .then(episodes => {
      setEpisodes(episodes)
    })
  }, [])

  const [formData, setFormData] = useState({
    episodeNum: '',
    winner: '',
    loser: '',
    top1: '',
    top2: '',
    top3: '',
    bottom1: '',
    bottom2: '',
    bottom3: '',
  })

  const handleChange = evt => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    })
  }

  let leagueNumber = 0
  function getLeagueNumber (user, profile) {
    if (user.user.profile === profile._id) {
      leagueNumber = profile.league[0].leagueNo
    }
  }
  profiles?.length ?
  profiles?.forEach(profile => {
    getLeagueNumber({user}, profile)
  })
  :
  console.log("no profiles")

  let eliminatedQueen = ""
  function getEliminatedQueen (elimQueen) {
    queens.map(queen => {
      if (queen.leagueNo === leagueNumber && queen.name === elimQueen) {
        console.log("input queen",elimQueen)
        console.log("lookup queen", queen)
        eliminatedQueen = queen._id
      }
    })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    getEliminatedQueen(formData.loser)
    try {
      const data = await episodeService.createEpisode(formData, leagueNumber)
      for (let i=0; i < data.episodes.length; i++) {
        if (data.episodes[i]._id === data.episode._id) {
          data.episodes[i].number = data.episode.number
          data.episodes[i].winner = data.episode.winner
          data.episodes[i].loser = data.episode.loser
          data.episodes[i].tops = data.episode.tops
          data.episodes[i].bottoms = data.episode.bottoms
        }
      }
      console.log("create ep response: ", data)
      setEpisodes(data.episodes)
    } catch (err) {
      console.log(err)
    }
    try {
      const data = await queenService.eliminateQueen(eliminatedQueen)
      console.log("elim queen response: ", data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (episode) => {
    console.log("episode.loser: ", episode.loser)
    getEliminatedQueen(episode.loser)

    try {
      const data = await episodeService.deleteEpisode(episode)
      console.log("delete ep response: ", data)
      setEpisodes(data)
    } catch (err) {
      console.log(err)
    }

    try {
      const data = await queenService.undoElim(eliminatedQueen)
      console.log("undo elim response: ", data)
    } catch (err) {
      console.log(err)
    }
  }

  const { episodeNum } = formData
  const { winner } = formData
  const { loser } = formData
  const { top1 } = formData
  const { top2 } = formData
  const { top3 } = formData
  const { bottom1 } = formData
  const { bottom2 } = formData
  const { bottom3 } = formData

  let safeQueens = []
  let leagueScores = []
  let score = 0
  function getScore (profiles, episode) {
    profiles?.forEach(profile => {
      if (profile.league[0]?.leagueNo === leagueNumber) {
        console.log(profile)
        for (let i = 0; i < profile.guessEpisode.length; i++) {
          if (profile.guessEpisode[i].episode === episode.number) {
            console.log(profile.guessEpisode[i], episode)
            // WINNER SCORE
            if (profile.guessEpisode[i].queen1 === episode.winner || profile.guessEpisode[i].queen2 === episode.winner) {
              score += 10
              // console.log("winner", score)
            }
            // TOPS SCORE QUEEN1
            if (episode.tops.includes(profile.guessEpisode[i].queen1)) {
              score += 5
              // console.log("queen1 top", score)
            }
            // TOPS SCORE QUEEN2
            if (episode.tops.includes(profile.guessEpisode[i].queen2)) {
              score += 5
              // console.log("queen2 top", score)
            }
            // LOSER SCORE
            if (profile.guessEpisode[i].queen1 === episode.loser || profile.guessEpisode[i].queen2 === episode.loser) {
              score -= 3
              // console.log("loser", score)
            }
            // SAFE QUEEN1
            if (safeQueens.includes(profile.guessEpisode[i].queen1)) {
              score += 3
              // console.log("queen1 safe", score)
            }
            // SAFE QUEEN2
            if (safeQueens.includes(profile.guessEpisode[i].queen2)) {
              score += 3
              // console.log("queen2 safe", score)
            }
            // BOTTOMS SCORE QUEEN1
            if (episode.bottoms.includes(profile.guessEpisode[i].queen1)) {
              score -= 2
              // console.log("queen1 bottom", score)
            }
            // BOTTOMS SCORE QUEEN2
            if (episode.bottoms.includes(profile.guessEpisode[i].queen2)) {
              score -= 2
              // console.log("queen2 bottom", score)
            }
            console.log(profile.name, score)
            leagueScores.push({profile: profile._id, weeklyScore: score})
            console.log("leagueScores: ", leagueScores)
            score = 0
          }
        }
      }
    })
  }
  
  episodes?.map(episode => {
    if (episode.leagueNo === leagueNumber) {
      console.log("episode: ", episode, queens)
      queens.map(queen => {
        if (queen.leagueNo === leagueNumber) {
          // console.log("queen: ", queen.name)
          if (episode.winner !== queen.name && episode.loser !== queen.name && episode.bottoms.includes(queen.name) === false && episode.tops.includes(queen.name) === false) {
            safeQueens.push(queen.name)
          }
        }
      })
      console.log("safeQueens: ", safeQueens)
      getScore(profiles, episode)
      safeQueens = []
    }
  })


  return ( 
    <>
    <>
    <h1>Episode's</h1>
    <>
    {profiles?.length ?
    <>
    {profiles?.map(profile => 
      profile._id === user.profile ? 
      <>
        {profile.league[0]?.isAdmin ? 
          <>
            <h1>Add A Episode:</h1>
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              className="add-queen-form"
              >
                <label htmlFor="episodeNum">Episode #:</label>
                <input type="text" autoComplete="off" id="episodeNum" name="episodeNum" value={episodeNum}
                onChange={handleChange}/>
                <br/>
                <label htmlFor="winner">Winner:</label>
                <select type="text" autoComplete="off" id="winner" name="winner" value={winner}
                onChange={handleChange}>
                  <option value="default">-Select Queen-</option>
                  {queens?.map(queen => {
                    if (queen.eliminated === false && queen.leagueNo === profile.league[0].leagueNo) {
                      return <option value={queen.name}>{queen.name}</option>
                    }
                  })}
                </select>
                <br />
                <label htmlFor="loser">Loser:</label>
                <select type="text" autoComplete="off" id="loser" name="loser" value={loser}
                onChange={handleChange}>
                  <option value="default">-Select Queen-</option>
                  {queens?.map(queen => {
                    if (queen.eliminated === false && queen.leagueNo === profile.league[0].leagueNo) {
                      return <option value={queen.name}>{queen.name}</option>
                    }
                  })}
                </select>
                <br />
                <label htmlFor="loser">Top:</label>
                <select type="text" autoComplete="off" id="top1" name="top1" value={top1}
                onChange={handleChange}>
                  <option value="default">-Select Queen-</option>
                  {queens?.map(queen => {
                    if (queen.eliminated === false && queen.leagueNo === profile.league[0].leagueNo) {
                      return <option value={queen.name}>{queen.name}</option>
                    }
                  })}
                </select>
                <br />
                <label htmlFor="top2">Top:</label>
                <select type="text" autoComplete="off" id="top2" name="top2" value={top2}
                onChange={handleChange}>
                  <option value="default">-Select Queen-</option>
                  {queens?.map(queen => {
                    if (queen.eliminated === false && queen.leagueNo === profile.league[0].leagueNo) {
                      return <option value={queen.name}>{queen.name}</option>
                    }
                  })}
                </select>
                <br />
                <label htmlFor="top3">Top:</label>
                <select type="text" autoComplete="off" id="top3" name="top3" value={top3}
                onChange={handleChange}>
                  <option value="default">-Select Queen-</option>
                  {queens?.map(queen => {
                    if (queen.eliminated === false && queen.leagueNo === profile.league[0].leagueNo) {
                      return <option value={queen.name}>{queen.name}</option>
                    }
                  })}
                </select>
                <br />
                <label htmlFor="bottom1">Bottom:</label>
                <select type="text" autoComplete="off" id="bottom1" name="bottom1" value={bottom1}
                onChange={handleChange}>
                  <option value="default">-Select Queen-</option>
                  {queens?.map(queen => {
                    if (queen.eliminated === false && queen.leagueNo === profile.league[0].leagueNo) {
                      return <option value={queen.name}>{queen.name}</option>
                    }
                  })}
                </select>
                <br />
                <label htmlFor="bottom2">Bottom:</label>
                <select type="text" autoComplete="off" id="bottom2" name="bottom2" value={bottom2}
                onChange={handleChange}>
                  <option value="default">-Select Queen-</option>
                  {queens?.map(queen => {
                    if (queen.eliminated === false && queen.leagueNo === profile.league[0].leagueNo) {
                      return <option value={queen.name}>{queen.name}</option>
                    }
                  })}
                </select>
                <br />
                <label htmlFor="bottom3">Bottom:</label>
                <select type="text" autoComplete="off" id="bottom3" name="bottom3" value={bottom3}
                onChange={handleChange}>
                  <option value="default">-Select Queen-</option>
                  {queens?.map(queen => {
                    if (queen.eliminated === false && queen.leagueNo === profile.league[0].leagueNo) {
                      return <option value={queen.name}>{queen.name}</option>
                    }
                  })}
                </select>
                <div>
                  <button className="btn btn-primary">
                  Add Episode
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
    console.log("no profiles")
    }
    </>
      <div>
      </div>
      <div>
        {episodes?.length ? 
          <>
            {episodes?.map(episode => {
              if (episode.leagueNo === leagueNumber)
                return <>
                  <EpisodeCard episode={episode} key={episode.number} user={user} handleDelete={handleDelete} getEliminatedQueen={getEliminatedQueen}/>
                </>
           })}
          </>
          :
          <>No Episodes</>
        }
      </div>
    </>
    </>
   );
}
 
export default Episodes;