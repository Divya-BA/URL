
// import React, { useState } from 'react';
// import axios from 'axios';

// const Shortener = () => {
//   const [longURL, setLongURL] = useState('');
//   const [shortenedURL, setShortenedURL] = useState('');
//   const [error, setError] = useState('');

//   const handleShortenClick = () => {
//     const data = { originalUrl: longURL };
//     const BASE_URL="http://localhost:3000";

//     axios.post(`${BASE_URL}/shorten`, data)
//       .then((response) => {
//         console.log('Response from backend:', response);

//         setShortenedURL(response.data.shortUrl);
//         setLongURL(''); 

//       })
//       .catch((error) => {
//         console.log('Error from backend:', error);

//         setError('Failed to shorten the URL.');
//         console.error(error);
//       });
//   };

//   const handleCopyClick = () => {
//     const textArea = document.createElement('textarea');
//     textArea.value = shortenedURL;
//     document.body.appendChild(textArea);
//     textArea.select();
//     document.execCommand('copy');
//     document.body.removeChild(textArea);
//   };

//   return (
//     <div>
//       <h2>URL Shortener</h2>
//       <input
//         type="text"
//         value={longURL}
//         onChange={(e) => setLongURL(e.target.value)}
//         placeholder="Enter a long URL"
//       />
//       <button onClick={handleShortenClick}>Shorten URL</button>
//       {shortenedURL && (
//         <div>
//           <p>Shortened URL:http://localhost:3000/{shortenedURL}</p>
//           <button onClick={handleCopyClick}>Copy</button>
//         </div>
//       )}
//       {error && <p>Error: {error}</p>}
//     </div>
//   );
// };

// export default Shortener;
import React, { useState } from 'react';
import axios from 'axios';

const Shortener = () => {
  const [longURL, setLongURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');
  const [error, setError] = useState('');

  // Define BASE_URL here
  const BASE_URL = 'http://localhost:3000';

  const isValidURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleShortenClick = () => {
    if (!isValidURL(longURL)) {
      setError('Invalid URL. Please enter a valid URL.');
      return;
    }

    const data = { originalUrl: longURL };

    axios
      .post(`${BASE_URL}/shorten`, data)
      .then((response) => {
        console.log('Response from backend:', response);

        setShortenedURL(response.data.shortUrl);
        setLongURL('');
      })
      .catch((error) => {
        console.log('Error from backend:', error);

        setError('Failed to shorten the URL.');
        console.error(error);
      });
  };

  const handleCopyClick = () => {
    const textArea = document.createElement('textarea');
    textArea.value = `${BASE_URL}/${shortenedURL}`;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  return (
    <div>
      <h2>URL Shortener</h2>
      <input
        type="text"
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
        placeholder="Enter a long URL"
      />
      <button onClick={handleShortenClick}>Shorten URL</button>
      {shortenedURL && (
        <div>
          <p>Shortened URL:<a href={`${BASE_URL}/${shortenedURL}`} target='_blank'> {`${BASE_URL}/${shortenedURL}`}</a></p>
          <button onClick={handleCopyClick}>Copy</button>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Shortener;
