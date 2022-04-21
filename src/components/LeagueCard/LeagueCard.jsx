

const LeagueCard = ({ profile, user }) => {
  return ( 
    <>
      {profile._id === user.profile ? 
        <>
          <h3>League Name: {profile.league[0]?.name}</h3>
          <h3>League Number: {profile.league[0]?.leagueNo}</h3>
          {profile.league[0]?.isAdmin ? 
            <>
              <h3>League Password: {user.profile}</h3>
            </>
          :
            <></>
          }
          
        </>
        :
        <></>
      }

    </>
   );
}
 
export default LeagueCard;