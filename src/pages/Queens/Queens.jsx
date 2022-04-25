import QueenForm from "../../components/QueenForm/QueenForm";
import QueenCard from "../../components/QueenCard/QueenCard";
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
      <div>
        {profiles.map(profile => {
          return <QueenForm profile={profile} user={user} key={profile._id}/>
        })}
      </div>
      <div>
        <h1>Queens:</h1>
        {profiles.map(profile => {
          return <>
            {queens.map(queen => {
              return <QueenCard queen={queen} profile={profile} user={user} key={queen._id}/>
            })}
          </>
        })}

      </div>
    </>
   );
}
 
export default Queens;