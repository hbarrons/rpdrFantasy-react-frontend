import { useState } from "react"


const AdminPlayerCard = ({profile, user, makeAdmin, removeAdmin }) => {




  return ( 
    <>
      <li>{profile.name}
      {profile.league[0].isAdmin === false ?
      <><button className="btn" onClick={()=>makeAdmin(profile._id)}>Make Admin</button></>
      :
      <><button className="btn btn-danger" onClick={()=>removeAdmin(profile._id)}>Remove Admin</button></>
      }
      </li>
    </>
  );
}
 
export default AdminPlayerCard;