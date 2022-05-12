import * as queenService from '../../services/queenService'
import { useState, useEffect } from 'react'


const QueenCard = ({ profile, queen, user, handleDelete }) => {

  

  return ( 
    <>{profile._id === user.profile ? 
      <>
        {profile.league[0]?.isAdmin ? 
          <>
            <li>{queen.name} {queen.elminiated ? 
              "(Eliminated)" : ""}</li>
            <button type="button" className="btn btn-primary" >Add to Roster</button>  
            <button type="button" className="btn btn-danger" onClick={() => handleDelete(queen._id)}>Delete</button>
          </>
        :
          <>
            <li>{queen.name} {queen.elminiated ? 
              "(Eliminated)" : ""}</li>
            <button>Add to Roster</button>
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