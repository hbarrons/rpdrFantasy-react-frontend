import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/auth`

export async function createQueen (queen) {
  console.log("queen: ", queen)
  return await fetch(`${BASE_URL}/addqueen`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
  })
  .then(res => res.json())
}