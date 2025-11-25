

import { useState } from 'react';
import BoardNew from './BoardNew';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Game({ user }) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelsWon, setLevelsWon] = useState(0);
  const navigate = useNavigate();

  // YE LINE SABSE ZAROORI HAI
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleWin = () => {
    const newWins = levelsWon + 1;
    setLevelsWon(newWins);
    if (currentLevel < 5) {
      setTimeout(() => setCurrentLevel(currentLevel + 1), 2000);
    } else {
      const won = newWins >= 3;
      axios.post(`${API_URL}/api/game/save`, { levelsWon: newWins, tournamentWon: won }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      }).catch(() => {});
      alert(won ? 'CHAMPION!' : `Finished with ${newWins}/5 wins`);
      navigate('/leaderboard');
    }
  };

  const handleLose = () => {
    axios.post(`${API_URL}/api/game/save`, { levelsWon, tournamentWon: false }, {
      headers: { 'x-auth-token': localStorage.getItem('token') }
    }).catch(() => {});
    alert(`Game Over! You won ${levelsWon}/5`);
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