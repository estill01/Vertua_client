import React, { useEffect } from 'react'
import PageErrorBoundary from './PageErrorBoundary'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { search, stashSearch } from '../app/slices/SearchSlice'

const SearchResultsPage = () => {
	const location = useLocation()
	const dispatch = useDispatch()

	// TODO make this a watcher / subscribe to store (?) -- It's not updating when the query changes when you 
	let query = useSelector(state => state.search.srp.query)
	let previewQuery = useSelector(state => state.search.query)
	let results = useSelector(state => state.search.srp.results)
	let runtime = useSelector(state => state.search.srp.runtime)

	useEffect(() => {
		console.log("-- Search Results Page")
		let urlQuery = location.search.replace('?query=','')
		urlQuery  = decodeURIComponent(urlQuery)

		if ((query === '' || previewQuery === '') && (urlQuery != '')) {
			(async function() {
				await dispatch(search(urlQuery)); dispatch(stashSearch());
			})()

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
					<div>{results.length} results</div>
					<div className='ml-4'>Completed in {runtime} milliseconds</div>
				</div>

				<h2>Results</h2>
				{results}

				<div 
				className='text-sm text-blue-500 hover:text-blue-300 active:text-blue-700 cursor-pointer'
				style={{ fontVariant: 'small-caps' }}
				>
					+ add project
				</div>

			</PageErrorBoundary>
		</>
	)
}

export default SearchResultsPage
