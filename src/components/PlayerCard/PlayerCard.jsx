import { useState } from "react"
import { Link } from "react-router-dom";
import './PlayerCard.css'

const PlayerCard = ({profile, user, makeAdmin}) => {


  return ( 
    <>
        <Link to={`/profile/${profile._id}`} state={profile} className="player-link">
          <li className="playercard">{profile.name}</li>
        </Link >
    </>
  );
}
 
export default PlayerCard;