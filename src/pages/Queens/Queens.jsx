import QueenForm from "../../components/QueenForm/QueenForm";
import QueenCard from "../../components/QueenCard/QueenCard";
import { useState, useEffect } from 'react'
import * as queenService from '../../services/queenService'


const Queens = ({ profiles, user }) => {
  const [queens, setQueens] = useState([])

  useEffect(() => {
    queenService.getAllQueens()
    .then(queens => {
      console.log("useEffect: ", queens)
      setQueens(queens)
    })
  }, [])

  const handleDelete = async (queen) => {
    try {
      const data = await queenService.deleteQueen(queen)
      console.log("response data: ", data)
    } catch (err) {
      console.log(err)
    }
  }

  console.log(queens)

  return ( 
    <>
      <div>
        {profiles.map(profile => {
          return <QueenForm profile={profile} user={user} key={profile._id}/>
        })}
      </div>
      <div>
        <h1>Queens:</h1>
        {queens.length ? 
          <>
            {profiles.map(profile => {
          return <>
            {queens?.map(queen => {
              return <QueenCard queen={queen} profile={profile} user={user} key={queen._id} handleDelete={handleDelete}/>
            })}
          </>
        })}
          </>
          :
          <>No Queens</>
        }
      </div>
    </>
   );
}
 
export default Queens;