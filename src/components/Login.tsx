import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';

export default function Login() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const habilitado = name.length >= 3;
  const navigate = useNavigate();

  const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setName(event?.target.value);
  };

  const handlebtnEntrar = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      createUser({ name })
        .then(() => {
          setLoading(false);
          navigate('/search');
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }, [loading, name, navigate]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
  };

  return (
    <form onSubmit={ handleFormSubmit }>
      <input
        id="name"
        value={ name }
        onChange={ handleNameChange }
        data-testid="login-name-input"
        type="text"
      />
      <button
        type="submit"
        data-testid="login-submit-button"
        onClick={ handlebtnEntrar }
        disabled={ !habilitado }
      >
        Entrar
      </button>
      {loading && <p>Carregando...</p>}
    </form>
  );
}
