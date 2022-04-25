import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/queens`

export async function createQueen (queen) {
  console.log("queen: ", queen)
  return await fetch(`${BASE_URL}/addqueen/${queen.queen}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify()
  })
  .then(res => res.json())
}

export async function getAllQueens (){
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}