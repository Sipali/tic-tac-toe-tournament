import { useState } from 'react';
import BoardNew from './BoardNew';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Game({ user }) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelsWon, setLevelsWon] = useState(0);
  const navigate = useNavigate();

  // YE PERFECT HAI (Render pe .env.production se aa raha hoga)
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleWin = async () => {
    const newWins = levelsWon + 1;
    setLevelsWon(newWins);

    if (currentLevel < 5) {
      setTimeout(() => setCurrentLevel(currentLevel + 1), 2000);
    } else {
      const tournamentWon = newWins >= 3;

      try {
        await axios.post(
          `${API_URL}/api/game/save`,
          { levelsWon: newWins, tournamentWon },
          {
            headers: {
              // YE SABSE BADA FIX — TOKEN HEADER GALAT THA!
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        console.log('Score saved successfully!');
      } catch (err) {
        console.error('Score save failed:', err.response?.data || err.message);
        alert('Score not saved! Check internet or login again.');
      }

      alert(tournamentWon ? 'CHAMPION! Trophy Won!' : `Tournament Over! ${newWins}/5 Wins`);
      navigate('/leaderboard');
    }
  };

  const handleLose = async () => {
    try {
      await axios.post(
        `${API_URL}/api/game/save`,
        { levelsWon, tournamentWon: false },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('Score saved (loss)');
    } catch (err) {
      console.error('Score save failed on loss:', err.response?.data || err.message);
    }

    alert(`Game Over! You won ${levelsWon}/5 levels`);
    navigate('/leaderboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white p-10">
      <h1 className="text-6xl font-bold text-center mb-4">Tic Tac Toe Tournament</h1>
      <p className="text-2xl text-center mb-8">
        Welcome, <span className="text-yellow-400 font-bold">{user?.username}</span> | 
        <span className="text-cyan-400 cursor-pointer" onClick={() => navigate('/leaderboard')}> Leaderboard</span> | 
        <span className="text-red-400 cursor-pointer" onClick={() => { localStorage.clear(); window.location.href = '/' }}> Logout</span>
      </p>

      <div className="text-center">
        <h2 className="text-5xl font-bold mb-4">Level {currentLevel} (Difficulty: {currentLevel}/5)</h2>
        <p className="text-3xl text-yellow-300 mb-10">Wins so far: {levelsWon}</p>
        <BoardNew onWin={handleWin} onLose={handleLose} />
      </div>
    </div>
  );
}