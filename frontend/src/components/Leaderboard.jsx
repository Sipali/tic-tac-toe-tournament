

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  // PRODUCTION + LOCAL READY
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_URL}/api/game/leaderboard`)
      .then(res => setLeaders(res.data))
      .catch(() => alert("Leaderboard not loading!"));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-5xl font-bold text-center mb-10 text-yellow-400">Tournament Leaderboard</h1>
      <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full">
          <thead className="bg-purple-800">
            <tr>
              <th className="p-6 text-left text-xl">Rank</th>
              <th className="p-6 text-left text-xl">Player</th>
              <th className="p-6 text-center text-xl">Trophy Wins</th>
              <th className="p-6 text-center text-xl">Total Wins</th>
            </tr>
          </thead>
          <tbody>
            {leaders.length === 0 ? (
              <tr><td colSpan="4" className="text-center py-10 text-gray-400">No champions yet!</td></tr>
            ) : (
              leaders.map((u, i) => (
                <tr key={u._id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                  <td className="p-6 text-2xl">{i + 1}</td>
                  <td className="p-6 text-xl font-bold text-cyan-400">{u.username}</td>
                  <td className="p-6 text-center text-3xl">{u.tournamentWins}</td>
                  <td className="p-6 text-center text-yellow-400">{u.wins}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}