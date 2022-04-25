import QueenForm from "../../components/QueenForm/QueenForm";
import { useState, useEffect } from 'react'
import * as queenService from '../../services/queenService'


const Queens = ({ profiles, user }) => {
  const [queens, setQueens] = useState([])

  useEffect(() => {
    queenService.getAllQueens()
    .then(queens => setQueens(queens))
  }, [])

  return ( 
    <>
      <h1>Queens Here</h1>
      {profiles.map(profile => {
        return <QueenForm profile={profile} user={user} key={profile._id}/>
      })}
    </>
   );
}
 
export default Queens;