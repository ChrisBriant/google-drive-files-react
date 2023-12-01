import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleSignInButton from './components/GoogleSignInButton';
import { useContext,  useEffect } from 'react';
import {Context as AuthContext} from './context/AuthContext';
import Documents from './components/Documents';

function App() {
  const {getToken, testEncrypt,state:{googleToken}} = useContext(AuthContext);
  console.log('LOADING', googleToken);

  useEffect(() => {
    getToken();
    //testEncrypt();
    console.log('Using Effect');
  },[]);

  return (
    <div className="App">
      <header className="App-header">

      </header>
      <main>
        {
          !googleToken
          ? <GoogleSignInButton />
          : <div>
            <p>You are signed in.</p>
            <Documents />
          </div>
          
          
        }
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
