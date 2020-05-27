import React from 'react'
import PageErrorBoundary from './PageErrorBoundary'
import { useSelector } from 'react-redux'

const SearchResultsPage = () => {
	let query = useSelector(state => state.search.srp.query)
	let results = useSelector(state => state.search.srp.results)
	let runtime = useSelector(state => state.search.srp.runtime)
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
