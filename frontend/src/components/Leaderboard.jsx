import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/game/leaderboard')
      .then(res => setLeaders(res.data));
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-4xl mb-6">Tournament Leaderboard</h1>
      <table className="w-full bg-gray-800 rounded">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Rank</th>
            <th className="p-4 text-left">Player</th>
            <th className="p-4">Tournament Wins</th>
            <th className="p-4">Total Levels Won</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((u, i) => (
            <tr key={u._id} className="border-b">
              <td className="p-4">{i + 1}</td>
              <td className="p-4">{u.username}</td>
              <td className="p-4 text-yellow-400 font-bold">{u.tournamentWins}</td>
              <td className="p-4">{u.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

