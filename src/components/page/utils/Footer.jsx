import React from 'react'
import PropTypes from 'prop-types'
import {
	Container,
	Icon,
	Segment,
	Grid,
	Header,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import { Socials } from '../Socials.jsx'


const Footer = () => (
	<>
		<div 
		style={{
			minHeight: '15rem',
			backgroundColor: '#171717',
			color: 'whitesmoke',
			borderTop: '4px solid #e03997',
			display: 'flex',
		}}>
			<Container style={{ display: 'flex', flex: 1 }}>
				<div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
					<div style={{ flex: 1 }}>
						<Container style={{ height: '100%' }}>
						<Grid
						style={{
							margin: 0,
							height: '100%',
							padding: '2rem 0',
						}}
						>
							<Grid.Row columns={3}>
								<Grid.Column>
									<Header style={{ color: 'whitesmoke' }}>Products</Header>
									<div>Brainputer Gear</div>
								</Grid.Column>

								<Grid.Column>
									<Header style={{ color: 'whitesmoke' }}>Connect</Header>
								</Grid.Column>

								<Grid.Column>
									<Header style={{ color: 'whitesmoke' }}>About</Header>
									<div>FAQ</div>
									<div>Privacy Policy</div>
								</Grid.Column>
							</Grid.Row>
						</Grid>

						</Container>
					</div>
					<div style={{ textAlign: 'center', padding: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<div style={{ color: "#6b4d69" }}>© 2020, Vertua Inc.</div>
						<div style={{ color: '#56464f', fontSize: '0.75rem' }}>
							All Rights Reserved.
						</div>
					</div>
				</div>
			</Container>
		</div>
	</>
)

export default Footer
