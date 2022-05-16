import * as queenService from '../../services/queenService'
import { useState, useEffect } from 'react'


const QueenCard = ({ profile, queen, user, handleDelete, addToRoster, removeFromRoster }) => {

  
  console.log(user)
  return ( 
    <>{profile._id === user.profile ? 
      <>
        {profile.league[0]?.isAdmin ? 
          <>
            <li>{queen.name} {queen.elminiated ? 
              "(Eliminated)" : ""}</li>
            <button type="button" className="btn btn-primary" onClick={() => addToRoster(queen.name, user.profile)}>Add to Roster</button> 
            <button className="btn btn-primary" onClick={() => removeFromRoster(queen.name, user.profile)}>Remove From Roster</button> 
            <button type="button" className="btn btn-danger" onClick={() => handleDelete(queen._id)}>Delete</button>
          </>
        :
          <>
            <li>{queen.name} {queen.elminiated ? 
              "(Eliminated)" : ""}</li>
            <button className="btn btn-primary" onClick={() => addToRoster(queen.name, user.profile)}>Add to Roster</button>
            <button className="btn btn-primary" onClick={() => removeFromRoster(queen.name, user.profile)}>Remove From Roster</button>
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