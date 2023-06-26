import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';

function Header() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setLoading(true);
    const recuperaNomeLogado = async () => {
      const user = await getUser();
      setUserName(user.name);
      setLoading(false);
    };

    recuperaNomeLogado();
  }, []);

  return (
    <header data-testid="header-component">
      {loading && <p>Carregando...</p>}
      <nav>
        <NavLink to="/search" data-testid="link-to-search">
          Search
        </NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">
          Favorites
        </NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">
          Profile
        </NavLink>
      </nav>
      <p
        data-testid="header-user-name"
      >
        {userName}

      </p>
    </header>
  );
}

export default Header;
