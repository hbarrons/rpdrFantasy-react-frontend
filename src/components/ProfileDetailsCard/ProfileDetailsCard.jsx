import { Link } from "react-router-dom";

const ProfileDetails = ({ profile }) => {
  return ( 
    <>
    <div className="player-details">
      <Link to={`/profile/${profile._id}`} state={profile}>
      <div className='container container-sm player-card'>
        <div>
          <h2>{profile.name}</h2>
          <h6>Score: {profile.totalScore}</h6>
        </div>
          <h5>Roster:</h5>
          {profile.roster.map(queen => {
            return <><li className="rosterqueen">{queen.queen}</li>
            </>
          })}
          <h5>Weekly Picks: Episode {profile.guessEpisode.length}</h5>
          <li className="rosterqueen">{profile.guessEpisode[profile.guessEpisode.length-1]?.queen1}</li>
          <li className="rosterqueen">{profile.guessEpisode[profile.guessEpisode.length-1]?.queen2}</li>
        </div>
      </Link>
    </div>
    </>
   );
}
 
export default ProfileDetails;