import { AlbumType, SongType } from '../types';

function MusicCard({ musicInfos }: { musicInfos: SongType | AlbumType }) {
  const { trackName, previewUrl } = musicInfos as SongType;
  return (
    <div>
      <h3>{trackName}</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
    </div>
  );
}

export default MusicCard;
