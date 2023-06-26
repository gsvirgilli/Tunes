import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getMusics from '../services/musicsAPI';
import { SongType } from '../types';
import MusicCard from './MusicCard';

function Album() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [albumInfo, setAlbumInfo] = useState([] as any);

  useEffect(() => {
    const buscaMusicas = async () => {
      setLoading(true);
      const resultadoBusca = await getMusics(id as string);
      setAlbumInfo(resultadoBusca);
      setLoading(false);
    };
    buscaMusicas();
  }, [id]);

  return (
    <div>
      {albumInfo && (
        <>
          <h2 data-testid="artist-name">{albumInfo[0]?.artistName}</h2>
          <h1 data-testid="album-name">{albumInfo[0]?.collectionName}</h1>
        </>
      )}
      {albumInfo.map((music: SongType, index: number) => (
        index > 0 && (
          <MusicCard key={ music.trackId } musicInfos={ music } />
        )
      ))}
      {loading && <p>Carregando...</p>}
    </div>
  );
}

export default Album;
