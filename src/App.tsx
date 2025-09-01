import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center space-y-8 max-w-md w-full">
        <div className="flex justify-center space-x-8">
          <a
            href="https://vite.dev"
            target="_blank"
            className="hover:scale-110 transition-transform duration-300"
          >
            <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            className="hover:scale-110 transition-transform duration-300"
          >
            <img src={reactLogo} className="h-24 w-24 animate-spin-slow" alt="React logo" />
          </a>
        </div>
        <h1 className="text-5xl font-bold text-gray-800 text-shadow">Vite + React</h1>
        <div className="space-y-4">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            count is {count}
          </button>
          <p className="text-gray-600">
            Edit{' '}
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">src/App.tsx</code> and
            save to test HMR
          </p>
        </div>
        <p className="text-gray-500 text-sm">Click on the Vite and React logos to learn more</p>

        {/* 추가 데모 요소들 */}
        <div className="space-y-3 pt-4 border-t border-gray-200">
          <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium">
            Secondary Button
          </button>
          <input
            type="text"
            placeholder="Type something..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
