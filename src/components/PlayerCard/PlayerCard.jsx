import { useState } from "react"
import { Link } from "react-router-dom";


const PlayerCard = ({profile, user, makeAdmin}) => {


  return ( 
    <>
      <Link to={`/profile/${profile._id}`} state={profile}>
        <li>{profile.name}</li>
      </Link >
    </>
  );
}
 
export default PlayerCard;