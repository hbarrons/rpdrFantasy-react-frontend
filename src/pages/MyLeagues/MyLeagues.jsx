import LeagueCard from "../../components/LeagueCard/LeagueCard"


const MyLeague = ({ profiles, user }) => {
  return ( 
    <>
      <h1>My League Info</h1>
      {console.log(profiles)}
      {console.log(user.profile)}
      {profiles.map(profile => {
        return <LeagueCard profile={profile} user={user}/>
      })}

    </>
   );
}
 
export default MyLeague;