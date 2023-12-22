import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Updatescore() {
  const { id } = useParams();
  const [newScore, setNewScore] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.get(`http://localhost:5000/api/profile/${id}`, config)
      .then(response => {
        setNewScore(response.data.game.rating);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleScoreUpdate = async () => {
    const gameId = id;
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await axios.put(`http://localhost:5000/api/profile/${gameId}`, { rating: newScore }, config);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Update Score</h1>
      <label htmlFor="newScore">New Score:</label>
      <input
        type="number"
        id="rating"
        value={newScore}
        onChange={(e) => setNewScore(e.target.value)}
      />
      <button onClick={handleScoreUpdate}>Update Score</button>
    </div>
  );
}
