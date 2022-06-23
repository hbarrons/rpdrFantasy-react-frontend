
const EpisodeCard = ({ episode, user, profiles, handleDelete}) => {
  return ( 
    <>
    <div className="container single-ep">
      <div className="ep-title">
        <h3>Episode {episode.number}</h3>
      </div>
      <div className="winner">
        <h5>Winner:</h5>
        <p>{episode.winner}</p>
      </div>
      <div className="loser">
        <h5>Loser: </h5>
        <p>{episode.loser}</p>
      </div>
      <div className="tops">
        <h5>Tops: </h5>
        <p>{episode.tops[0]}, {episode.tops[1]}, {episode.tops[2]}</p>
      </div>
      <div className="bottoms">
        <h5>Bottoms:</h5>
        <p>{episode.bottoms[0]}, {episode.bottoms[1]}, {episode.bottoms[2]}</p>
      </div>
      <button type="button" className="btn btn-danger" onClick={() => handleDelete(episode, profiles) }>Delete</button>
    </div>
    </>
   );
}
 
export default EpisodeCard;