// Toggle Dark Theme
import React from 'react'
import { Button } from 'semantic-ui-react'

// TODO set theme on redux store

function toggleTheme() {
	let d = document.documentElement,
			m = localStorage.getItem("theme")

	if (m === 'dark') {
		d.classList.add('theme-dark')
	}

	if (d.classList.contains("theme-dark")) {
		d.classList.remove("theme-dark")
		localStorage.removeItem("theme")
	} else {
		d.classList.add("theme-dark")
		localStorage.setItem("theme", "dark")
	}
}


const ThemeToggle = () => (
  <>
		<Button onClick={toggleTheme} className='text-primary font-body'>
			Toggle Theme
		</Button>
	</>
)

export default ThemeToggle
