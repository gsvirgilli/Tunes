import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Search from './components/Search';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <Search /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
