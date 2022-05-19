

const LeagueCard = ({ profile, user }) => {
  return ( 
    <>
      {profile._id === user.profile ? 
        <>
          <h5 className="leagueName">League Name:</h5> <p className="name">{profile.league[0]?.name}</p>
          <br />
          <h5 className="leagueNumber">League Number:</h5> <p className="number">{profile.league[0]?.leagueNo}</p>
        </>
        :
        <></>
      }

    </>
   );
}
 
export default LeagueCard;