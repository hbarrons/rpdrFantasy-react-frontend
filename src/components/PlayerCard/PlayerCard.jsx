

const PlayerCard = (profile, user) => {


  return ( 
    <>
      {console.log(profile)}
      {profile.profile.admin === true ? 
      <>
        <li>{profile.profile.name}</li>
      </>
      :
      <>
        <li>{profile.profile.name}</li>
      </>
      }
    </>
   );
}
 
export default PlayerCard;