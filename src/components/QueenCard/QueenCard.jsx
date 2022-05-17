import * as queenService from '../../services/queenService'
import { useState, useEffect } from 'react'


const QueenCard = ({ profile, queen, user, handleDelete, addToRoster, removeFromRoster }) => {

  queen.name = queen.name || queen.queen
  if (queen.eleminated === undefined) {
    queen.eleminated = false
  }
  console.log(queen._id)
  return ( 
    <>{profile._id === user.profile ? 
      <>
        {profile.league[0]?.isAdmin ? 
          <>
            <li>{queen.name} {queen.elminiated ? 
              "(Eliminated)" : ""}</li>
              {profile.roster.some(rosteredQueen => rosteredQueen.queen === queen.name) ? 
              <><button className="btn btn-warning" onClick={() => removeFromRoster(queen.name, user.profile)}>Remove From Roster</button></>
              :
              <><button type="button" className="btn btn-primary" onClick={() => addToRoster(queen.name, user.profile)}>Add to Roster</button></>
              }
                  
            <button type="button" className="btn btn-danger" onClick={() => handleDelete(queen._id)}>Delete</button>
          </>
        :
          <>
            <li>{queen.name} {queen.elminiated ? 
              "(Eliminated)" : ""}</li>
              {profile.roster.some(rosteredQueen => rosteredQueen.queen === queen.name) ? 
              <><button className="btn btn-warning" onClick={() => removeFromRoster(queen.name, user.profile)}>Remove From Roster</button></>
              :
              <><button type="button" className="btn btn-primary" onClick={() => addToRoster(queen.name, user.profile)}>Add to Roster</button></>
              }
          </>
        }
        
      </>
      :
      <></>
    }
    </>
  );
}
 
export default QueenCard;