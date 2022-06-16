import * as queenService from '../../services/queenService'
import { useState, useEffect } from 'react'
import styles from './QueenCard.css'


const QueenCard = ({ profile, queen, user, handleDelete, addToRoster, removeFromRoster }) => {

  
  

  queen.name = queen.name || queen.queen
  if (queen.eleminated === undefined) {
    queen.eleminated = false
  }
  
  return ( 
    <>{profile._id === user.profile ? 
      <>
        {profile.league[0]?.isAdmin ? 
          <>
          <div className='queen-card'>
            <h3 className='queen-name'>{queen.name} {queen.elminiated ? 
              "(Eliminated)" : ""}</h3>
              <div className='roster-buttons'>
              {profile.roster.some(rosteredQueen => rosteredQueen.queen === queen.name) ? 
                <><button className="btn btn-warning" onClick={() => removeFromRoster(queen.name, user.profile)}>Remove From Roster</button></>
                :
                <>
                {profile.roster.length >= 4 ? 
                ""
                :
                <>
                <button type="button" className="btn btn-primary" onClick={() => addToRoster(queen.name, user.profile)}>Add to Roster</button>
                </>
                }
                </>
              }
              </div>
                  
            <button type="button" className="btn btn-danger" onClick={() => handleDelete(queen._id)}>Delete</button>
          </div>
          </>
        :
          <>
          <div className='queen-card'>
            <h3 className='queen-name'>{queen.name} {queen.elminiated ? 
              "(Eliminated)" : ""}</h3>
              <div className='roster-buttons'>
              {profile.roster.some(rosteredQueen => rosteredQueen.queen === queen.name) ? 
              <><button className="btn btn-warning" onClick={() => removeFromRoster(queen.name, user.profile)}>Remove From Roster</button></>
              :
              <>
                {console.log(profile.roster.length)}
                {profile.roster.length === 4 ? 
                console.log(true)
                :
                <>
                <button type="button" className="btn btn-primary" onClick={() => addToRoster(queen.name, user.profile)}>Add to Roster</button>
                </>
                }
              </>
              }
              </div>
          </div>
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