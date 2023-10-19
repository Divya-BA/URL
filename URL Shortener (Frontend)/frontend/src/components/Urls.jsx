import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Urls() {
  const [urls, setUrls] = useState([]);
  const BASE_URL = 'http://localhost:3000';

  useEffect(() => {
    // Fetch the list of created URLs from the backend API
    axios.get(`${BASE_URL}/api/urls`)
      .then((response) => {
        setUrls(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data from the backend:', error);
      });
  }, []);

  const handleDelete = (shortUrl) => {
    // Send a DELETE request to delete the URL with the given shortUrl
    axios.delete(`${BASE_URL}/${shortUrl}`)
      .then((response) => {
        // Remove the deleted URL from the state
        setUrls((prevUrls) => prevUrls.filter((url) => url.shortUrl !== shortUrl));
      })
      .catch((error) => {
        console.error('Error deleting URL:', error);
      });
  };

  return (
    <div>
      <h1>URL Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Long URL</th>
            <th>Short URL</th>
            <th>Created At</th>
            <th>Clicks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id}>
              <td><a href={url.originalUrl} target='_blank'>{url.originalUrl}</a></td>
              <td><a href={`${BASE_URL}/${url.shortUrl}`} target='_blank'>{url.shortUrl}</a></td>
              <td>{new Date(url.createdAt).toLocaleString()}</td>
              <td>{url.clicks}</td>
              <td>
                <button onClick={() => handleDelete(url.shortUrl)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Urls;
