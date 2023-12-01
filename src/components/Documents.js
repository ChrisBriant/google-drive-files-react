import { useEffect, useContext, useState } from "react";
import { getDocuments } from "../network/requests";
import {Context as AuthContext } from '../context/AuthContext';


const paginate = (items, pageSize) => {
  if (pageSize < 1) {
    throw new Error('Page size must be more than zero.');
  }

  const pages = Math.floor(items.length / pageSize) + (items.length % pageSize > 0 ? 1 : 0);
  const pagedItems = [];

  for (let i = 0; i < pages; i++) {
    pagedItems.push(
      items.length - i * pageSize < pageSize
        ? items.slice(i * pageSize, items.length)
        : items.slice(i * pageSize, i * pageSize + pageSize)
    );
  }

  return pagedItems;
}


const Documents = () => {
  const {setToken,state:{googleToken}} = useContext(AuthContext);
  const [documents, setDocuments] = useState([]);
  const [pageIndex,setPageIndex] = useState(0);


  useEffect(() => {
    console.log('Documents use effect');
    if(googleToken) {

      getDocuments(googleToken).then((data) => {
        console.log('The data is', paginate(data,10));
        setDocuments(paginate(data,10));
      }).catch((err) => {
        console.log('Errrem', err);
        setToken(null);
      });
    } else {
      console.log('no token');
    }
    
  },[]);

  const setNextPage = () => {
    if(pageIndex < documents.length - 1) {
      setPageIndex(pageIndex + 1);
    }
    return;
  }

  const setPrevPage = () => {
    if(pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
    return;
  }

  return(
    <div className="documents-container">
      {
        documents.length !== 0
        ? <>
          <div className="documents-list">
            {
              documents[pageIndex].map((document) => (
                <div key={document.id}>{document.name}</div>
              ))
            }
          </div>
          <div className="document-navigation">
            <button
              disabled = {pageIndex === 0} 
              className="btn btn-nav" 
              onClick={() => setPrevPage()}>
                &laquo;
              </button>
            <p>Page {pageIndex+1} of {documents.length}</p>
            <button
              disabled = {pageIndex === documents.length - 1} 
              className="btn btn-nav" 
              onClick={() => setNextPage()}>
                &raquo;
              </button>
          </div>
        </>
        : <p>Loading...</p>
      }
    </div>

  );
}

export default Documents;