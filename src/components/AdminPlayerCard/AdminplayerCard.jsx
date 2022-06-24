import { useState } from "react"
import { Link } from "react-router-dom";


const AdminPlayerCard = ({profile, user, makeAdmin, removeAdmin }) => {




  return ( 
    <>
    <Link to={`/profile/${profile._id}`} state={profile}>
      <li>{profile.name}
      {profile.league[0].isAdmin === false ?
      <><button className="btn" onClick={()=>makeAdmin(profile._id)}>Make Admin</button></>
      :
      <><button className="btn btn-danger" onClick={()=>removeAdmin(profile._id)}>Remove Admin</button></>
      }
      </li>
      </Link>
    </>
  );
}
 
export default AdminPlayerCard;