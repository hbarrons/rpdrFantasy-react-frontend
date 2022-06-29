import { useState, useEffect } from 'react'
import * as episodeService from '../../services/eipsodeService.js'
import * as queenService from '../../services/queenService'
import * as profileService from '../../services/profileService'
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard.jsx'
import styles from './Episodes.css'

const Episodes = ({ user }) => {
  const [episodes, setEpisodes] = useState([])
  const [queens, setQueens] = useState([])
  const [profiles, setProfiles] = useState([])

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
  console.log()

  let eliminatedQueen = ""
  let elimQueenName = ""
  function getEliminatedQueen (elimQueen) {
    queens.map(queen => {
      if (queen.leagueNo === leagueNumber && queen.name === elimQueen) {
        eliminatedQueen = queen._id
        elimQueenName = queen.name
      }
    })
  }

  const handleSubmit = async evt => {
    console.log("handle submit sanity check")
    //default no guess to last weeks guess
    profiles.map(profile => {
      console.log("HIT", profile.guessEpisode.length + 1, formData.episodeNum)
      if (profile.guessEpisode.length + 1 === parseInt(formData.episodeNum)) {
        console.log("EPISODE: ", parseInt(formData.episodeNum), profile.guessEpisode.length)
        defaultNoGuessQueens(profile, formData.episodeNum)
      }
    })

    evt.preventDefault()
    getEliminatedQueen(formData.loser)
    try {
      const data = await episodeService.createEpisode(formData, leagueNumber)
      for (let i=0; i < data.episodes.length; i++) {
        if (data.episodes[i]._id === data.episode._id) {
          data.episodes[i].epNum = data.episode.epNum
          data.episodes[i].winner = data.episode.winner
          data.episodes[i].loser = data.episode.loser
          data.episodes[i].tops = data.episode.tops
          data.episodes[i].bottoms = data.episode.bottoms
        }
      }
      console.log("create ep response: ", data)
      setEpisodes(data.episodes)
      // defaultGuessScoreHelper(data.episodes, "submitScore")
    } catch (err) {
      console.log(err)
    }

    try {
      const data = await queenService.eliminateQueen(eliminatedQueen)
      console.log("elim queen response: ", data)
    } catch (err) {
      console.log(err)
    }

    try {
      const data = await profileService.updateRoster(elimQueenName, leagueNumber)
      console.log("elim queen response: ", data)
      setProfiles(data)
    } catch (err) {
      console.log(err)
    }

    try {
      const data = await profileService.updateWeeklyDrop(leagueNumber)
      console.log("update weekly drop response: ", data)
      for (let i=0; i<data.length; i++){
        if (data[i].league[0].leagueNo === leagueNumber) {

          data[i].weeklyDrop = false
        }
      }
      setProfiles(data)
    } catch (err) {
      console.log(err)
    }

  }

  const handleDelete = async (episode, profiles) => {
    console.log("episode.loser: ", episode.loser)
    getEliminatedQueen(episode.loser)


    try {
      const data = await episodeService.deleteEpisode(episode)
      console.log("delete ep response: ", data)
      setEpisodes(data)
      getScoreInfo(data, profiles, "deleteScore")
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


  const submitScores = async (scores, episodeNum) => {

    console.log("SUBMITTED SCORES", scores)

    console.log("submitScores", episodeNum)

    let episodeCount = 0
    episodes.map(episode => {
      // console.log(leagueNumber, episode)
      if (episode.leagueNo === leagueNumber) {
        episodeCount += 1
      }
    })
    console.log("episodeCount: ", episodeCount)
    if (episodeCount === episodeNum) {
      console.log("SUBMIT SCORES", scores, leagueNumber)
      try {
        const data = await profileService.submitScores(scores, episodeNum)
        console.log("submitScores response: ", data)
        for (let i=0; i<data.length; i++) {
          if (data[i].league[0].leagueNo === leagueNumber){
            scores.map(score => {
              if (score.profile === data[i]._id) {
                data[i].score.push({
                  episodeNum: data[i].score.length + 1,
                  score: score.weeklyScore
                })
              }
            })
          }
        }
        console.log("post loop: ", data)
        setProfiles(data)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const deleteScores = async (scores, episodeNum) => {
    console.log("deleteScores", episodeNum)
    console.log("deleteScores", scores)
  

    let episodeCount = 0
    episodes.map(episode => {
      if (episode.leagueNo === leagueNumber) {
        episodeCount += 1
      }
    })
    console.log("episodeCount: ", episodeCount)
    if (episodeCount === episodeNum + 1) {
      try {
        const data = await profileService.deleteScores(episodeCount, leagueNumber, scores)
        console.log("delete score response: ", data)
        setProfiles(data)
      } catch (err) {
        console.log(err)
      }
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

  let leagueEpisodes = []
  function getScoreInfo (episodeData, profiles, deleteOrSubmit) {
    console.log("GETSCOREINFO: ", episodeData, profiles, deleteOrSubmit)
    episodeData?.map(episode => {
      if (episode.leagueNo === leagueNumber) {
        leagueEpisodes.push(episode)
        queens.map(queen => {
          if (queen.leagueNo === leagueNumber) {
            // console.log("queen: ", queen.name)
            if (episode.winner !== queen.name && episode.loser !== queen.name && episode.bottoms.includes(queen.name) === false && episode.tops.includes(queen.name) === false) {
              safeQueens.push(queen.name)
            }
          }
        })
        let epNum = 0
        profiles.map(profile => {
          if (profile.league[0].leagueNo === leagueNumber) {
            console.log(profile)
            epNum = profile.score.length
          }
        })
        console.log(episode.epNum, epNum, profiles)
        if (episode.epNum === epNum + 1 || deleteOrSubmit === "deleteScore") {
          console.log("getScoreInfo Profiles: ", profiles)
          getScore(profiles, episode, deleteOrSubmit)
        }
        safeQueens = []
        leagueScores = []
      }
    })
    leagueEpisodes = []
  }

  let safeQueens = []
  let leagueScores = []
  let score = 0

 
  function getScore (profiles, episode, deleteOrSubmit) {
    console.log("GET SCORE Profiles: ", profiles)
    profiles?.forEach(profile => {
      if (profile.league[0]?.leagueNo === leagueNumber) {
        console.log("HIT HIT HIT")
        // if player did not make a guess for this week, this calls the defaultGuess function to populate with their previous week guess
        // if (profile.guessEpisode.length + 1 === episode.epNum) {
        //   console.log("EPISODE: ", episode.epNum, profile.guessEpisode)
        //   defaultNoGuessQueens(profiles, episode.epNum)
        // }

        console.log("calculate score:", profile.guessEpisode, episode.epNum)
        for (let i = 0; i < profile.guessEpisode.length; i++) {
          if (profile.guessEpisode[i].episode === episode.epNum) {
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
            leagueScores.push({profile: profile._id, weeklyScore: score})
            score = 0
          }
        }
      }
    })
    console.log("deleteOrSubmit: ", deleteOrSubmit)
    if (deleteOrSubmit === "submitScore") {
      console.log("line 295")
      submitScores(leagueScores, episode.epNum)
    } else if (deleteOrSubmit === "deleteScore") {
      deleteScores(leagueScores, episode.epNum)
    }
    console.log("deleteOrSubmit: ", deleteOrSubmit)
  }

  const defaultNoGuessQueens = async (profile, episodeNum) => {
    let defaultData = {
      episodeNum: "",
      queen1: "",
      queen2: "",
    }
    
      if (profile.league[0].leagueNo === leagueNumber) {
        console.log("DEFAULT SCORE HIT")

        defaultData = {
          episodeNum: episodeNum,
          queen1: profile.guessEpisode[profile.guessEpisode.length - 1].queen1,
          queen2: profile.guessEpisode[profile.guessEpisode.length - 1].queen2
        }
        console.log("defaultData: ", defaultData)
        defaultGuessAPI(defaultData, profile._id)
      }
  }

  const defaultGuessAPI = async (guessData, profileId) => {
    try {
      const data = await profileService.makeGuess(guessData, profileId)
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id === profileId) {
          data[i].guessEpisode.push({
            queen1: guessData.queen1,
            queen2: guessData.queen2,
            episode: guessData.episodeNum
          })
        }
      }
      console.log("default roster response: ", data)
      setProfiles(data)
      console.log("EPISODES: ", episodes)
      setTimeout(console.log("TIMEOUT TEST"), 5000)
      setTimeout(getScoreInfo(episodes, data, "submitScore"), 5000)

      //is there a way to call getScoreInfo here?
      // console.log("EPISODES TO CALC SCORE", episodes)
      // getScoreInfo(episodes, "submitScore")


    } catch (err) {
      console.log(err)
    }
  }

  let leagueEps = []

  function testScoreButton (profiles, episodes) {
    console.log("HIT")
    getScoreInfo(episodes, profiles, "submitScore")
  }


  return ( 
    <>
    <>
    <>
    {profiles?.length ?
    <>
    {profiles?.map(profile => 
      profile._id === user.profile ? 
      <>
        {profile.league[0]?.isAdmin ? 
          <>
          <div className='form-title'>
            <h2 className='title'>Admin Feature</h2>
            <h3 className='title'>Add A Episode</h3>
          </div>
          <div className='add-episode'>
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              className="add-episode-form"
              >
                  <label htmlFor="episodeNum" className='epnum-input'>Episode #:</label>
                  <input type="text" autoComplete="off" id="episodeNum" name="episodeNum" value={episodeNum}
                  onChange={handleChange} className='epnum-input'/>
                  <label htmlFor="winner" className='winner-form'>Winner:</label>
                  <select className='winner-form' type="text" autoComplete="off" id="winner" name="winner" value={winner}
                  onChange={handleChange}>
                    <option className='winner-form' value="default">-Select Queen-</option>
                    {queens?.map(queen => {
                      if (queen.eliminated === false && queen.leagueNo === profile.league[0].leagueNo) {
                        return <option key={queen._id} value={queen.name}>{queen.name}</option>
                      }
                    })}
                  </select>
                  <label className='loser-form' htmlFor="loser">Loser:</label>
                  <select className='loser-form' type="text" autoComplete="off" id="loser" name="loser" value={loser}
                  onChange={handleChange}>
                    <option value="default">-Select Queen-</option>
                    {queens?.map(queen => {
                      if (queen.eliminated === false && queen.leagueNo === profile.league[0].leagueNo) {
                        return <option key={queen._id} value={queen.name}>{queen.name}</option>
                      }
                    })}
                  </select>
                <div className='top1'>
                  <label htmlFor="loser">Top:</label>
                  <select type="text" autoComplete="off" id="top1" name="top1" value={top1}
                  onChange={handleChange}>
                    <option value="default">-Select Queen-</option>
                    {queens?.map(queen => {
                      if (queen.eliminated === false && queen.leagueNo === profile.league[0].leagueNo) {
                        return <option key={queen._id} value={queen.name}>{queen.name}</option>
                      }
                    })}
                  </select>
                </div>
                <div className='top2'>
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
                </div>
                <div className='top3'>
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
                </div>
                <div className='bottom1'>
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
                </div>
                <div className='bottom2'>
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
                </div>
                <div className='bottom3'>
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

                </div>
                <div>
                  <button className="btn btn-primary add-ep-btn">
                  Add Episode
                  </button>
                </div>
              </form>
              {episodes.map(episode => {
                if (episode.leagueNo === leagueNumber) {
                  leagueEps.push(episode)
                }})
              }
              {profile.score[profile.score.length-1]?.episodeNum !== leagueEps.length ? 
              <>
                {leagueEps.length === 0 ?
                <></>
                :
                <>
                  <button className='btn btn-warning' onClick={() => testScoreButton(profiles, episodes)}>Calculate Scores</button>
                </>
                }
              </>
              :
              <></>
              }
                <>

                </>
          </div>
          <p>Note : The point distribution is set up as follows: 10pts for Winner, -3pts for Loser, 5pts each for Tops, -2pts each for Bottoms, and 3pts each for Safe (assigned if queen is not selected in any dropdown). If Ru does something wild (ie double shantay, no bottoms, two winners) you may need to assign category's at your own discretion in order to have the most fair outcome. If a field is left blank no queen will be assigned points for that dropdown.</p>
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
    ""
    }
    </>
      <div>
        <h1 className='title'>Episode's</h1>
      </div>
      <div className='all-episodes'>
        {episodes?.length ? 
          <>
            {episodes?.map(episode => {
              if (episode.leagueNo === leagueNumber)
                return <>
                  <EpisodeCard episode={episode} profiles={profiles} key={episode.epNum} user={user} handleDelete={handleDelete} getEliminatedQueen={getEliminatedQueen}/>
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