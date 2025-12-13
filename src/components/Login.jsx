import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Accepts any login for demo
        if (username && password) {
            onLogin();
        } else {
            setError("Please enter username and password.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">
            <div className="bg-white/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Lexus Prime</h2>
                    <p className="text-gray-500 text-sm tracking-widest uppercase mt-1">Membership Portal</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-5">
                    <input type="text" placeholder="Username" className="w-full px-4 py-3 border rounded-lg" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" className="w-full px-4 py-3 border rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                    <button type="submit" className="w-full py-3 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800">Login</button>
                </form>
            </div>
        </div>
    );
};
export default Login;