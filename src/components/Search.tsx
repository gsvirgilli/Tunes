import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';

function Search() {
  const [artistName, setArtistName] = useState('');
  const [nomeArtista, setNomeArtist] = useState('');
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [searchCompleted, setSearchCompleted] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(event.target.value);
  };

  const handleSearch = async () => {
    if (artistName.length >= 2) {
      setLoading(true);
      setNomeArtist(artistName);
      const response = await searchAlbumsAPI(artistName);
      setAlbums(response);
      setLoading(false);
      setArtistName('');
      setSearchCompleted(true);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    return event?.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h1>Pesquisar Artista</h1>
        <input
          type="text"
          value={artistName}
          onChange={handleInputChange}
          data-testid="search-artist-input"
        />
        <button
          onClick={handleSearch}
          disabled={artistName.length < 2}
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </form>
      {loading && <p>Carregando...</p>}

      {searchCompleted && (
        <div>
          {albums.length > 0 ? (
            <>
              <p>Resultado de álbuns de: {nomeArtista}</p>
              <ul>
                {albums.map((album) => (
                  <li key={album.collectionId}>
                    <Link
                      to={`/album/${album.collectionId}`}
                      data-testid={`link-to-album-${album.collectionId}`}
                    >
                      {album.collectionName}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Nenhum álbum foi encontrado.</p>
          )}
        </div>
      )}
    </>
  );
}

export default Search;
