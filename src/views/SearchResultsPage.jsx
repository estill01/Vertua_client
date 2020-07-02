import React, { useEffect } from 'react'
import PageErrorBoundary from './PageErrorBoundary'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { search, stashSearch } from '../app/slices/SearchSlice'
import { isNil } from 'lodash'
import { SearchFilters, SearchResults, SearchResultsSection } from '../components/search'

const SearchResultsPage = () => {
	const location = useLocation()
	const dispatch = useDispatch()
	let query = useSelector(state => state.search.srp.query) 
	let previewQuery = useSelector(state => state.search.query) 
	let runtime = useSelector(state => state.search.srp.runtime)
	let results = useSelector(state => state.search.srp.results)
	let resultsCount = results.users.length + results.projects.length
	let resultWord = () => {
		if (resultsCount === 1) { return 'Result' } 
		else { return 'Results' }
	}

	useEffect(() => {
		let urlQuery = location.search.replace('?query=','')
		urlQuery  = decodeURIComponent(urlQuery)

		if ((query === '' || previewQuery === '') && (urlQuery != '')) {
			(async function() {
				await dispatch(search(urlQuery)); dispatch(stashSearch());
			})()
			document.getElementById('superbar_search_input').value = urlQuery
		}
		return () => { }
	})


	return (
		<>
			<PageErrorBoundary>
				<div className='flex flex-col min-h-screen'>

					<div className='flex flex-row items-center p-4'>
						<span className='mr-1 text-gray-600'>{resultsCount} {resultWord()} For</span>
						<span className='text-lg font-bold italic'>{query}</span> 
					</div>

					<div className='flex flex-row flex-1 px-2 pb-4'>
						<SearchFilters results={results} className='invisible w-0 md:visible md:w-48 border border-gray-400 rounded-sm'/>
						<div className='ml-4'>
							<SearchResultsSection type='projects' results={results} className='mb-4'/>
							<SearchResultsSection type='users' results={results}/>
						</div>
					</div>
				</div>
			</PageErrorBoundary>
		</>
	)
}
export default SearchResultsPage

						// <SearchResults className='flex-1 ml-4' results={results}/>
