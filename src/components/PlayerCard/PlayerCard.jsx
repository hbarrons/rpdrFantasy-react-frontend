import { useState } from "react"
import { Link } from "react-router-dom";
import './PlayerCard.css'

const PlayerCard = ({profile, user, makeAdmin}) => {


  return ( 
    <>
      <div className="profile-div">
        <Link to={`/profile/${profile._id}`} state={profile}>
          <li className='profile-link'>{profile.name}</li>
        </Link >
      </div>
    </>
  );
}
 
export default PlayerCard;