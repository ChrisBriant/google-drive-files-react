import createDataContext from './createDataContext';
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

const defaultState = {
  googleToken : null,
  // accessToken : null,
  // refreshToken : null,
  // isAuthed : false,
  // signinDisplayMode : "signin",
};

const authReducer = (state,action) => {

  switch(action.type) {
    //UNUSED
    case 'setToken':
      console.log('Setting token', action.payload);
      return {...state,googleToken:action.payload};
    // case 'setIsAuthed':
    //   return {...state,isAuthed:action.payload};
    // case 'setSigninRegisterOrReset':
    //   return {...state,signinDisplayMode:action.payload}
    default:
      return defaultState;
  }
};

//Setters

const setToken = (dispatch) => (googleToken) => {
  const encryptedAccessToken = encryptToken(googleToken);
  localStorage.setItem('access_token',encryptedAccessToken);
  dispatch({type:'setToken', payload:googleToken});
}

const getToken = (dispatch) => async () => {
  const accessToken = localStorage.getItem('access_token');
  if(accessToken) {
    let decryptedToken = decryptToken(accessToken);
    dispatch({type:'setToken', payload:decryptedToken});
  }
}

function testEncrypt() {
  const encryptedAccessToken = encryptToken('This is a sausage');
  const decryptedToken = decryptToken(encryptedAccessToken);
  return null;
}

//ENCRYPTION
// Encrypt the token before storing it in local storage
const encryptToken = (token) => {
  const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  return encryptedToken;
};

// Decrypt the token when you need to use it
const decryptToken = (encryptedToken) => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
  const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedToken;
};

// const setIsAuthed = (dispatch) => (authed) => {
//   dispatch({type:'setIsAuthed',payload:authed})
// }

//This is to set state which will tell whether to display the signin dialog, register or reset
// const setSigninRegisterOrReset = (dispatch) => (mode) => {
//   dispatch({type:'setSigninRegisterOrReset',payload:mode})
// }

export const {Provider, Context} = createDataContext (
    authReducer,
    {setToken, getToken},
    {...defaultState}
);