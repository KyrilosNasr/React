import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Auth from './components/Auth';
import Counter from './components/Counter';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
function App() {
  const authState = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Fragment>
      <Header></Header>
      {!authState && <Auth />}
      {authState && <UserProfile />}
      
      <Counter />
    </Fragment>
  );
}

export default App;
