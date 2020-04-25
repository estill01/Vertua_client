import React from 'react';
import ThemeToggle from '../ThemeToggle'
import Superbar from '../superbar'

import '../../assets/fonts/Comfortaa-Regular.ttf'
import '../../assets/fonts/Comfortaa-Bold.ttf'

function App() {
  return (
    <div className="bg-secondary font-body">
			<Superbar/>
      <header>
        <p className='text-primary'>
					Welcome to Vertua
        </p>
				<ThemeToggle/>
      </header>
    </div>
  );
}

export default App;
