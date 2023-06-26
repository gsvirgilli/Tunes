import { useState } from 'react';
import { AlbumType, SongType } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';

function MusicCard({ musicInfos }: { musicInfos: SongType | AlbumType }) {
  const { trackId, trackName, previewUrl } = musicInfos as SongType;
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const heartImage = isFavorite ? checkedHeart : emptyHeart;

  return (
    <div>
      <h3>{trackName}</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elementoa
        {' '}
        <code>audio</code>
        .
      </audio>
      <label
        htmlFor={ `checkbox-music-${trackId}` }
        data-testid={ `label-music-${trackId}` }
      >
        <img alt="favorite" src={ heartImage } />
        <input
          type="checkbox"
          id={ `checkbox-music-${trackId}` }
          data-testid={ `checkbox-music-${trackId}` }
          checked={ isFavorite }
          onChange={ toggleFavorite }
        />
      </label>
    </div>
  );
}

export default MusicCard;
