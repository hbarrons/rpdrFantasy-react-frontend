import { useState } from "react"


const AdminPlayerCard = ({profile, user, makeAdmin}) => {




  return ( 
    <>
      <li>{profile.name}
      {profile.league[0].isAdmin === false ?
      <><button className="btn" onClick={()=>makeAdmin(profile._id)}>Make Admin</button></>
      :
      <><button className="btn btn-danger">Remove Admin</button></>
      }
      </li>
    </>
  );
}
 
export default AdminPlayerCard;