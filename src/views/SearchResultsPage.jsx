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
		return () => { }
	})

	return (
		<>
			<PageErrorBoundary>
				<div className='flex flex-col'>

					<div className='flex flex-row items-center p-4'>
						<span className='text-lg font-bold'>Query</span> 
						<span className='ml-2 italic'>{query}</span>
					</div>

					<div className='flex flex-row px-4 pb-4'>
						<SearchFilters results={results}/>
						<div className='ml-4'>
							<SearchResultsSection type='projects' results={results}/>
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
