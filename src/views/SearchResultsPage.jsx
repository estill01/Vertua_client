import React, { useEffect } from 'react'
import PageErrorBoundary from './PageErrorBoundary'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { search, stashSearch } from '../app/slices/SearchSlice'

const SearchResultsPage = () => {
	const location = useLocation()
	const dispatch = useDispatch()
	let query = useSelector(state => state.search.srp.query) 
	let previewQuery = useSelector(state => state.search.query) 
	let runtime = useSelector(state => state.search.srp.runtime)
	let results = useSelector(state => state.search.srp.results)

	useEffect(() => {
		console.log("-- Search Results Page")
		let urlQuery = location.search.replace('?query=','')
		urlQuery  = decodeURIComponent(urlQuery)

		if ((query === '' || previewQuery === '') && (urlQuery != '')) {
			(async function() {
				await dispatch(search(urlQuery)); dispatch(stashSearch());
			})()
			document.getElementById('superbar_search_input').value = urlQuery
		}

		return () => {
		}
	})


	return (
		<>
			<PageErrorBoundary>
				<div className='h-10'/>
				<h3>Query: {query}</h3>
				<div className='flex flex-row'>
					<div>{results.users.length + results.projects.length} results.</div>
					<div className='ml-2'>Completed in {runtime} milliseconds</div>
				</div>

				<h3 style={{fontVariant:'small-caps'}}>projects</h3>
				{ results.projects.length === 0 && (
					<div className='italic'>No Projects Found</div>
				)}
				{ (results.projects.length != 0 ) &&
					results.projects.map((result, i) => {
						return (
						<div key={i}>
							{result}
						</div>
						)
					})
				}
				<div 
				className='text-sm text-blue-500 hover:text-blue-300 active:text-blue-700 cursor-pointer'
				style={{ fontVariant: 'small-caps' }}
				>
					+ add project
				</div>


				<h3 style={{fontVariant:'small-caps'}}>approaches</h3>
				{ results.projects.length === 0 && (
					<div className='italic'>No Approaches Found</div>
				)}
				{ (results.projects.length != 0 ) &&
					results.projects.map((result, i) => {
						return (
						<div key={i}>
							{result}
						</div>
						)
					})
				}
				<div 
				className='text-sm text-blue-500 hover:text-blue-300 active:text-blue-700 cursor-pointer'
				style={{ fontVariant: 'small-caps' }}
				>
					+ add approach
				</div>

				<h3 style={{fontVariant:'small-caps'}}>experiments</h3>
				{ results.projects.length === 0 && (
					<div className='italic'>No Experiments Found</div>
				)}
				{ (results.projects.length != 0 ) &&
					results.projects.map((result, i) => {
						return (
						<div key={i}>
							{result}
						</div>
						)
					})
				}
				<div 
				className='text-sm text-blue-500 hover:text-blue-300 active:text-blue-700 cursor-pointer'
				style={{ fontVariant: 'small-caps' }}
				>
					+ add experiment
				</div>


				<h3 style={{fontVariant:'small-caps'}}>protocols</h3>
				{ results.projects.length === 0 && (
					<div className='italic'>No Protocols Found</div>
				)}
				{ (results.projects.length != 0 ) &&
					results.projects.map((result, i) => {
						return (
						<div key={i}>
							{result}
						</div>
						)
					})
				}
				<div 
				className='text-sm text-blue-500 hover:text-blue-300 active:text-blue-700 cursor-pointer'
				style={{ fontVariant: 'small-caps' }}
				>
					+ add protocol
				</div>

				<h3 style={{fontVariant:'small-caps'}}>groups</h3>
				{ results.users.length === 0 && (
					<div className='italic'>No Groups Found</div>
				)}

				{ (results.users.length != 0 ) && 
					results.projects.map((result, i) => {
						return (
						<div key={i}>
							{result}
						</div>
						)
					})
				}

				<div 
				className='text-sm text-blue-500 hover:text-blue-300 active:text-blue-700 cursor-pointer'
				style={{ fontVariant: 'small-caps' }}
				>
					+ add group
				</div>


				<h3 style={{fontVariant:'small-caps'}}>users</h3>
				{ results.users.length === 0 && (
					<div className='italic'>No Users Found</div>
				)}

				{ (results.users.length != 0 ) && 
					results.users.map((result, i) => {
						console.log("> got result: ", result)
						return (
						<div key={i}>
							{result.displayName}
						</div>
						)
					})
				}

				<div 
				className='text-sm text-blue-500 hover:text-blue-300 active:text-blue-700 cursor-pointer'
				style={{ fontVariant: 'small-caps' }}
				>
					+ add user
				</div>


				<h3 style={{fontVariant:'small-caps'}}>tools</h3>
				{ results.users.length === 0 && (
					<div className='italic'>No Tools Found</div>
				)}

				{ (results.users.length != 0 ) && 
					results.projects.map((result, i) => {
						return (
						<div key={i}>
							{result}
						</div>
						)
					})
				}

				<div 
				className='text-sm text-blue-500 hover:text-blue-300 active:text-blue-700 cursor-pointer'
				style={{ fontVariant: 'small-caps' }}
				>
					+ add tool
				</div>


			</PageErrorBoundary>
		</>
	)
}

export default SearchResultsPage
