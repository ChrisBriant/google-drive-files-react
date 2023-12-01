import { useGoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import {Context as AuthContext} from '../context/AuthContext';


const GoogleSignInButton = (props) => {
  const {setToken,state:{googleToken}} = useContext(AuthContext);
  const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

  const login = useGoogleLogin({
    scope: SCOPES,
    onSuccess: codeResponse => {
      //Get the token from the django app endpoint
      console.log('CODE RESPONSE', codeResponse);
      const token = codeResponse.access_token ;
      console.log('token', token);
      setToken(token);
    },
  });


  return (
      <button type="button" className="btn btn-signin" onClick={() => login()}>
        Sign in with Google
      </button>
  );
}

export default GoogleSignInButton;