// Toggle Dark Theme
import React from 'react'

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


const ThemeToggle = ({ props }) => (
  <>
		<button onClick={toggleTheme} className='btn text-primary' { ...props }>
			Toggle Theme
		</button>
	</>
)

export default ThemeToggle
