import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/queens`

async function getAllQueens (){
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

async function createQueen (queen, leagueNo) {
  console.log("service fun:",leagueNo)
  return await fetch(`${BASE_URL}/addqueen/${queen.queen}/${leagueNo}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    }
  },)
  .then(res => res.json())
}

async function deleteQueen (queen) {
  console.log("queen: ", queen)
  return await fetch(`${BASE_URL}/deletequeen/${queen}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify()
  },)
  .then(res => res.json())
}


async function eliminateQueen (queen) {
  console.log("eliminated queen: ", queen)
  return await fetch(`${BASE_URL}/eliminatequeen/${queen}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify()
  },)
  .then(res => res.json())
}

async function addToRoster (queen) {
  console.log("rostered queen: ", queen)
  return await fetch(`${BASE_URL}/addtoroster/${queen}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify()
  },)
  .then(res => res.json())
}


export {
  getAllQueens,
  createQueen,
  deleteQueen,
  eliminateQueen,
  addToRoster
}