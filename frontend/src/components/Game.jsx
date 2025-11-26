import { useState } from 'react';
import BoardNew from './BoardNew';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Game({ user }) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelsWon, setLevelsWon] = useState(0);
  const navigate = useNavigate();

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
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        alert(tournamentWon ? 'CHAMPION! Trophy Won!' : `Tournament Over! ${newWins}/5 Wins`);
      } catch (err) {
        alert('Score not saved! Check internet or login again.');
      }
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
    } catch (err) {
      console.log("Loss score save failed (optional)");
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