import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/episodes`

async function getAllEpisodes (){
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

async function createEpisode (episode, leagueNo) {
  console.log(episode)
  return await fetch(`${BASE_URL}/addepisode/${episode.episodeNum}/${leagueNo}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(episode) 
  },)
  .then(res => res.json())
}

async function deleteEpisode (episode) {
  console.log(episode)
  return await fetch(`${BASE_URL}/deleteepisode/${episode._id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify() 
  },)
  .then(res => res.json())
}


export {
  getAllEpisodes,
  createEpisode,
  deleteEpisode
}