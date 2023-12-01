//import {conn } from './conn';
import axios from 'axios';

// Replace 'YOUR_ACCESS_TOKEN' with the actual access token obtained during the authentication process.
const accessToken = 'YOUR_ACCESS_TOKEN';

// Replace 'YOUR_DOCUMENT_ID' with the ID of the Google Docs document you want to access.
//const documentId = 'YOUR_DOCUMENT_ID';

//Filter the file list to combine into folders and then files
const filterDriveFileList = (driveData) => {
  let folders = [];
  let files = [];
  driveData.files.map(val => {
    if(val.mimeType === 'application/vnd.google-apps.folder') {
      folders.push(val);
    } else {
      files.push(val);
    }
  });
  return [...folders,...files];
}


const getDocuments = (accessToken) => {
  const conn = axios.create({
    baseURL: 'https://www.googleapis.com/drive/v3',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    params: {
      q: "'root' in parents", // This query retrieves files with no parents (top-level files)
      fields: 'files(id, name, kind, mimeType)',
      orderBy: 'modifiedTime desc',
    }
  });

  return new Promise((resolve,reject) => {
    conn.get(`/files`)
    .then( (response) => {
      if(response.status == 200) {
        const foldersAndFiles = filterDriveFileList(response.data);
        return resolve(foldersAndFiles);
      } else {
        return reject('Token is invalid');
      } 

    }).catch((err) => {
      console.log(err);
      return reject('An error occured');
    });
  });
}


//DOESN'T APPLY TO ACCESS TOKEN DO NOT USE
// async function validateGoogleToken(token) {
//   try {
//     const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
//     const { data } = response;

//     // Check for required fields (e.g., aud, iss, exp)
//     if (data.aud === 'your-client-id' && data.iss === 'accounts.google.com' && data.exp > Math.floor(Date.now() / 1000)) {
//       // Token is valid
//       return true;
//     } else {
//       // Token is invalid
//       console.error('Invalid token:', data);
//       return false;
//     }
//   } catch (error) {
//     console.error('Error validating Google token:', error);
//     return false;
//   }
// }

export {getDocuments};