import * as queenService from '../../services/queenService'
import { useState, useEffect } from 'react'
import styles from './QueenCard.css'


const QueenCard = ({ profile, queen, user, handleDelete, addToRoster, removeFromRoster }) => {

  
  

  queen.name = queen.name || queen.queen


  
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
                <>
                {console.log("LOOK HERE", profile.weeklyDrop)}
                {profile.weeklyDrop === true && profile.roster.length >= 4?
                <><h6 className='locked'>ROSTER LOCKED</h6></>
                :
                <>
                  <button className="btn btn-warning" onClick={() => removeFromRoster(queen.name, user.profile)}>Remove From Roster</button>
                </>
                }
                </>
                :
                <>
                {profile.roster.length >= 4? 
                ""
                :
                <>
                {queen.eliminated === false ?
                <><button type="button" className="btn btn-primary" onClick={() => addToRoster(queen.name, user.profile)}>Add to Roster</button></>
                :
                <></>}
                
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
              {profile.roster.some(rosteredQueen => rosteredQueen.queen === queen.name && queen.elminiated !== true) ? 
              <>
                {profile.weeklyDrop === true && profile.roster.length >= 4 ? 
                <>
                <h6 className='locked'>ROSTER LOCKED</h6>
                </> 
                : 
                <>
                  <button className="btn btn-warning" onClick={() => removeFromRoster(queen.name, user.profile)}>Remove From Roster</button>
                </>}
              </>
              :
              <>
                {profile.roster.length === 4 ? 
                <>
                </>
                :
                <>
                {queen.eliminated === false ?
                <><button type="button" className="btn btn-primary" onClick={() => addToRoster(queen.name, user.profile)}>Add to Roster</button></>
                :
                <></>
                }

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