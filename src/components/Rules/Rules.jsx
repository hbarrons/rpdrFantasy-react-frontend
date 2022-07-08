

const Rules = (props) => {
  return ( 
    <>
      <div className="rules">
        <h2>Rules:</h2>
        <li className="rule">Each player selects four queens for their roster</li>
        <li className="rule">For each episode you will play 2 queens from your roster</li>
        <li className="rule">Points are determined based off winner/tops/bottoms/loser</li>
        <li className="rule">After each week's episode you are able to drop one queen from your roster and add another</li>
        <li className="rule">If a queen from your roster is eliminated, you are able to add a new queen in addition to your one allowed drop/add</li>
      </div>
    </>
   );
}
 
export default Rules;