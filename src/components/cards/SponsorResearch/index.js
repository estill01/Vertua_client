import React, { useState, useEffect } from 'react'
import { useStore } from 'react-redux'


const SponsorResearchCard = () => {
	return (
		<>
			<div 
			style={{
				backgroundImage: `url(${require('./images/image.jpeg')})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'none',
				// backgroundImage: 'linear-gradient(to bottom right, yellow, orange'
			}}
			className='p-4 h-64'
			>
				<h3>Sponsor Research</h3>
				<ul>
					<li>- Commission one-off experiments of-interest.</li>
					<li>- Advance research agendas to further development of products or IP.</li>
					<li>- Back promising researchers, groups, or areas of study.</li>
					<li>- Participate in IP-share aragnements for potential future IP derived from work you sponsor.</li>
					<li>- Donate materials or resources to projects and causes you support.</li>
				</ul>
			</div>
		</>
	)
}
export default SponsorResearchCard
