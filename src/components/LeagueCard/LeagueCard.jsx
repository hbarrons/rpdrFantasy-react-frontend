

const LeagueCard = ({ profile }) => {
  return ( 
    <>
      <h1>League Info Here</h1>
      {console.log(profile.league)}
      <h1>{profile.league[0]?.name}</h1>
    </>
   );
}
 
export default LeagueCard;