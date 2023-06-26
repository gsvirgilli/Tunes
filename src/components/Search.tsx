import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';

function Search() {
  const [artistName, setArtistName] = useState('');
  const [nomeArtista, setNomeArtist] = useState('');
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [searched, setSearched] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(event.target.value);
  };

  const handleSearch = async () => {
    if (artistName.length >= 2) {
      setLoading(false);
      setNomeArtist(artistName);
      const response = await searchAlbumsAPI(artistName);
      setAlbums(response);
      setLoading(true);
      setArtistName('');
      setSearched(true);
    }
  };

  return (
    <>
      {loading ? (
        <form>
          <input
            type="text"
            value={ artistName }
            onChange={ handleInputChange }
            data-testid="search-artist-input"
          />
          <button
            type="button"
            onClick={ handleSearch }
            disabled={ artistName.length < 2 }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      ) : (
        <p>Carregando...</p>
      )}

      {albums.length > 0 ? (
        <ul>
          <p>
            Resultado de álbuns de:
            {' '}
            {nomeArtista}
          </p>
          {albums.map((album) => (
            <li key={ album.collectionId }>
              <NavLink
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                {album.collectionName}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        searched && <p>Nenhum álbum foi encontrado</p>
      )}
    </>
  );
}

export default Search;
