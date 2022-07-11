import { useState } from "react"
import { Link } from "react-router-dom";


const AdminPlayerCard = ({profile, user, makeAdmin, removeAdmin }) => {




  return ( 
    <>
    
      <li><Link to={`/profile/${profile._id}`} state={profile} className="player-link">{profile.name}</Link>
      {profile.league[0].isAdmin === false ?
      <><button className="btn btn-sm" onClick={()=>makeAdmin(profile._id)}>Make Admin</button></>
      :
      <><button className="btn btn-danger btn-sm" onClick={()=>removeAdmin(profile._id)}>Remove Admin</button></>
      }
      </li>
      
    </>
  );
}
 
export default AdminPlayerCard;