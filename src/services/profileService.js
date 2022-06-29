import * as tokenService from '../services/tokenService'

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/profiles`

export async function getAllProfiles() {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

export async function createLeague(leagueName, leagueNo, userId) {
  return await fetch (`${BASE_URL}/createleague/${userId}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify({leagueName: leagueName, leagueNo: leagueNo})
  })
  .then(res => res.json())
}

export async function joinLeague(leagueInfo, userId) {
  console.log("leagueInfo: ", leagueInfo)
  console.log("userId: ", userId)
  return await fetch (`${BASE_URL}/joinleague`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify({leagueInfo, userId})
  })
  .then(res => res.json())
}

export async function addToRoster (queen, user) {
  console.log("rostered queen: ", queen)
  console.log("user: ", user)
  return await fetch(`${BASE_URL}/addtoroster/${user}/${queen}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify()
  },)
  .then(res => res.json())
}

export async function removeFromRoster (queen, user) {
  console.log("rostered queen: ", queen)
  console.log("user: ", user)
  return await fetch(`${BASE_URL}/removefromroster/${user}/${queen}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify()
  },)
  .then(res => res.json())
}

export async function makeGuess (guessInfo, user) {
  console.log("guessInfo: ", guessInfo)
  return await fetch(`${BASE_URL}/makeguess/${user}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(guessInfo)
  },)
  .then(res => res.json())
}

export async function updateGuess (guessInfo, user) {
  console.log("guessInfo: ", guessInfo)
  return await fetch(`${BASE_URL}/updateguess/${user}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(guessInfo)
  },)
  .then(res => res.json())
}

export async function submitScores (scores, episodeNum) {
  console.log("service: ", scores, episodeNum)
  return await fetch(`${BASE_URL}/submitscores/${episodeNum}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(scores)
  },)
  .then(res => res.json())
}

export async function deleteScores (episodeNum, leagueNum, scores) {
  console.log("delete scores service: ", episodeNum)
  return await fetch(`${BASE_URL}/deletescores/${episodeNum}/${leagueNum}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(scores)
  },)
  .then(res => res.json())
}

export async function makeAdmin (profileId) {
  console.log("makeAdmin service: ", profileId)
  return await fetch(`${BASE_URL}/makeadmin/${profileId}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify()
  },)
  .then(res => res.json())
}

export async function removeAdmin (profileId) {
  console.log("makeAdmin service: ", profileId)
  return await fetch(`${BASE_URL}/removeadmin/${profileId}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify()
  },)
  .then(res => res.json())
}

export async function updateRoster (queen, leagueNum) {
  console.log("rostered queen: ", queen)
  return await fetch(`${BASE_URL}/updateroster/${queen}/${leagueNum}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify()
  },)
  .then(res => res.json())
}

export async function weeklyDrop (user) {
  console.log("user: ", user)
  return await fetch(`${BASE_URL}/weeklydrop/${user}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify()
  },)
  .then(res => res.json())
}

export async function updateWeeklyDrop (leagueNum) {
  console.log("leagueNum: ", leagueNum)
  return await fetch(`${BASE_URL}/updateweeklydrop/${leagueNum}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify()
  },)
  .then(res => res.json())
}

export async function unlockRoster (profileId, leagueNum) {
  console.log("unlock: ", profileId, leagueNum)
  return await fetch(`${BASE_URL}/unlockroster/${profileId}/${leagueNum}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify()
  },)
  .then(res => res.json())
}