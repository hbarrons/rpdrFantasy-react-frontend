import QueenForm from "../../components/QueenForm/QueenForm";


const Queens = ({ profiles, user }) => {
  return ( 
    <>
      <h1>Queens Here</h1>
      {profiles.map(profile => {
        return <QueenForm profile={profile} user={user} key={profile._id}/>
      })}
    </>
   );
}
 
export default Queens;