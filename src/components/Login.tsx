import { useEffect, useState } from 'react';
import { createUser } from '../services/userAPI';

export default function Login() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const habilitado = name.length >= 3;

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
          setTimeout(() => {
            setLoading(false);
            window.location.href = '/search';
          }, 1000);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }, [loading]);

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
