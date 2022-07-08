
const EpisodeCard = ({ episode, user, profiles, handleDelete}) => {
  return ( 
    <>
    {profiles.map(profile => {
      if (profile.league[0].isAdmin === true && user.profile === profile._id) {
        return <>
          <div className="container single-ep">
            <div className="ep-title">
              <h3>Episode {episode.epNum}</h3>
            </div>
            <div className="winner">
              <h5>Winner:</h5>
              <p className="outcome">{episode.winner}</p>
            </div>
            <div className="loser">
              <h5>Loser: </h5>
              <p className="outcome">{episode.loser}</p>
            </div>
            <div className="tops">
              <h5>Tops: </h5>
              <p className="outcome">{episode.tops[0]}, {episode.tops[1]}, {episode.tops[2]}</p>
            </div>
            <div className="bottoms">
              <h5>Bottoms:</h5>
              <p className="outcome">{episode.bottoms[0]}, {episode.bottoms[1]}, {episode.bottoms[2]}</p>
            </div>
            <button type="button" className="btn btn-danger" onClick={() => handleDelete(episode, profiles) }>Delete</button>
          </div>
        </>
      }
    })}
        {profiles.map(profile => {
      if (profile.league[0].isAdmin === false && user.profile === profile._id) {
        return <>
          <div className="container single-ep">
            <div className="ep-title">
              <h3>Episode {episode.epNum}</h3>
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
          </div>
        </>
      }
    })}
    </>
   );
}
 
export default EpisodeCard;