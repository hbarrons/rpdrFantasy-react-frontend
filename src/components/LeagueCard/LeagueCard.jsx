

const LeagueCard = ({ profile, user }) => {
  return ( 
    <>
      {profile._id === user.profile ? 
        <h1>{profile.league[0]?.name}</h1>
        :
        <></>
      }

    </>
   );
}
 
export default LeagueCard;