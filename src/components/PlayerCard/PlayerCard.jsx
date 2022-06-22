import { useState } from "react"


const PlayerCard = ({profile, user, makeAdmin}) => {
  const [checked, setChecked] = useState(false)

  let userIsAdmin = false
  function isUserAdmin (profile, user) {
    console.log(profile)
    if (profile.league[0].isAdmin === true && profile._id === user.profile) {
      userIsAdmin = true
    }
  }
  isUserAdmin(profile,user)

  return ( 
    <>
      {userIsAdmin === true ?
      <>
        <li>{profile.name} <input type="checkbox" checked={checked} onChange={makeAdmin}></input></li>
      </>
      :
      <>
        <li>{profile.name}</li>
      </>}

    </>
  );
}
 
export default PlayerCard;