import React from 'react';
import ThemeToggle from '../ThemeToggle'
import Superbar from '../superbar'
import '../../assets/fonts/Comfortaa-Regular.ttf'
import '../../assets/fonts/Comfortaa-Bold.ttf'
import { Metadata } from '../page'

const Page = () => (
    <div className="bg-secondary font-body">
			<Superbar/>
      <header>
        <p className='text-primary'>
					Welcome to Vertua
        </p>

				<div>
					Projects
				</div>
				<div>
					Approaches
				</div>

				<ThemeToggle/>
      </header>
    </div>
)

function App() {
  return (
		<>
			<Metadata/>
			<Page/>
			<Footer/>
		</>
  );
}

export default App;

