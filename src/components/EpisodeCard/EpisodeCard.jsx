
const EpisodeCard = ({ episode, user, handleDelete }) => {
  return ( 
    <>
      <h3>Episode {episode.number}</h3>
      <h5>Winner: {episode.winner}</h5>
      <h5>Loser: {episode.loser}</h5>
      <h5>Tops: {episode.tops[0]}, {episode.tops[1]}, {episode.tops[2]}</h5>
      <h5>Bottoms: {episode.bottoms[0]}, {episode.bottoms[1]}, {episode.bottoms[2]}</h5>
      <button type="button" className="btn btn-danger" onClick={() => handleDelete(episode)}>Delete</button>
    </>
   );
}
 
export default EpisodeCard;