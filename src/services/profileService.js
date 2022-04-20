import * as tokenService from '../services/tokenService'

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/profiles`

export async function getAllProfiles() {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

export async function createLeague(leagueName, leagueNo, userId) {
  // console.log("leagueName: ", leagueName)
  // console.log("leagueNo: ", leagueNo)
  // console.log("userId: ", userId)
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


