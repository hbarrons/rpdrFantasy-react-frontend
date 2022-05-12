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
      console.log("useEffect: ", queens)
      setQueens(queens)
    })
  }, [])

  useEffect(() => {
    episodeService.getAllEpisodes()
    .then(episodes => {
      console.log("useEffect: ", episodes)
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

  const handleDelete = async (episode) => {
    try {
      const data = await episodeService.deleteEpisode(episode)
      console.log("delete ep response: ", data)
      setEpisodes(data.episodes)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      const data = await episodeService.createEpisode(formData)
      for (let i=0; i < data.episodes.length; i++) {
        if (data.episodes[i]._id === data.episode._id) {
          data.episodes[i].number = data.episode.number
          data.episodes[i].winner = data.episode.winner
          data.episodes[i].tops = data.episode.tops
          data.episodes[i].bottoms = data.episode.bottoms
        }
      }
      console.log("create ep response: ", data)
      setEpisodes(data.episodes)
    } catch (err) {
      console.log(err)
    }
    // setFormData({queenName: ""})
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




  return ( 
    <>
    <>
      <h1>Episode Info Here</h1>
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
                      if (queen.eliminated === false) {
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
                      if (queen.eliminated === false) {
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
                      if (queen.eliminated === false) {
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
                      if (queen.eliminated === false) {
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
                      if (queen.eliminated === false) {
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
                      if (queen.eliminated === false) {
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
                      if (queen.eliminated === false) {
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
                      if (queen.eliminated === false) {
                        return <option value={queen.name}>{queen.name}</option>
                      }
                    })}
                  </select>
                  <div>
                    <button className="addepisode-btn">
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
      <div>
        <p>Episode List Here</p>
      </div>
      <div>
        {console.log("episodes: ", episodes)}
        {episodes?.length ? 
          <>
            {episodes?.map(episode => {
            return <>
            <EpisodeCard episode={episode} key={episode.number} user={user} handleDelete={handleDelete}/>
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