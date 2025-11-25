import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="bg-gray-800 p-4">
          <div className="max-w-6xl mx-auto flex justify-between">
            <h1 className="text-2xl font-bold">Tic Tac Toe Tournament</h1>
            {user && (
              <div className="flex gap-4">
                <span>Welcome, {user.username}!</span>
                <a href="/leaderboard" className="text-blue-400">Leaderboard</a>
                <button onClick={() => { setUser(null); localStorage.removeItem('user'); }} className="text-red-400">Logout</button>
              </div>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Auth setUser={setUser} user={user} />} />
          <Route path="/game" element={user ? <Game user={user} setUser={setUser} /> : <Auth setUser={setUser} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;