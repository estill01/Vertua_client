import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import ThemeToggle from './features/ThemeToggle'
import Superbar from './components/superbar'
import './fonts/Comfortaa-Regular.ttf'
import './fonts/Comfortaa-Bold.ttf'

function App() {
  return (
    <div className="App bg-secondary">
			<Superbar/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />

        <p className='text-primary'>
					Welcome to Vertua
        </p>

        <span className='text-secondary'>
          <span>Learn </span>
          <a
            className="text-inverse-soft"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="text-default"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="text-primary"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="text-secondary"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
				<span>
					<ThemeToggle/>
				</span>
      </header>
    </div>
  );
}

export default App;
