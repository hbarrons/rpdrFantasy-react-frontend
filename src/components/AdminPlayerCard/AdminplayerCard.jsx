import { useState } from "react"


const AdminPlayerCard = ({profile, user, makeAdmin}) => {
  const [checked, setChecked] = useState(false)



  return ( 
    <>
      <li>{profile.name} <input type="checkbox" checked={checked} onChange={() => makeAdmin(profile._id)}></input></li>
    </>
  );
}
 
export default AdminPlayerCard;