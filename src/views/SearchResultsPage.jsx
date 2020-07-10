import React, { useEffect } from 'react'
import PageErrorBoundary from './PageErrorBoundary'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { search, stashSearch } from '../app/slices/SearchSlice'
import { TYPES } from '../app/utils'
import { isNil } from 'lodash'
import { SearchFilters, SearchResults, SearchResultsSection, ContentPreview } from '../components/search'
import Sticky from 'react-sticky-el'

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

	// let footer = document.getElementById('footer')

	useEffect(() => {
		let urlQuery = location.search.replace('?query=','')
		urlQuery  = decodeURIComponent(urlQuery)

		if ((query === '' || previewQuery === '') && (urlQuery !== '')) {
			(async function() {
				await dispatch(search(urlQuery)); dispatch(stashSearch());
			})()

			let el = document.getElementById('superbar_search_input')
			if (!isNil(el)) { el.value = urlQuery }
		}
		return () => { }
	})

	return (
		<>
			<PageErrorBoundary>
				<div className='flex flex-col min-h-screen'>
					<div className='flex flex-row flex-1 px-2 py-4'>

						<div 
						className='invisible w-0 md:visible md:w-48 md:mr-4'
						>
							<SearchFilters results={results} className='invisible w-0 md:visible md:w-48 border border-gray-400 rounded-sm fixed'/>
						</div>

						<div className='flex flex-col flex-1 w-full bg-white'>

							<div className='p-1 mb-2 truncate gray-600'>
								{resultsCount} {resultWord()} for <span className='text-lg font-bold italic'>{query}</span> 
							</div>

							<SearchResultsSection type={TYPES.projects} results={results} className='mb-4'/>
							<SearchResultsSection type={TYPES.users} results={results} className='mb-4'/>
							<SearchResultsSection type='groups' results={results} className='mb-4'/>
							<SearchResultsSection type='experiments' results={results} className='mb-4'/>
							<SearchResultsSection type='tools' results={results} className='mb-4'/>
							<SearchResultsSection type='services' results={results} className='mb-4'/>
						</div>

						<div 
						className='invisible w-0 max-w-lg lg:visible lg:flex-1 lg:ml-4 flex flex-col'
						id='contentPreviewScrollBoundary'
						>
							<Sticky
							boundaryElement={'#contentPreviewScrollBoundary'}
							bottomOffset={10}
							>
								<div style={{ height: '4.875rem' }} />
								<ContentPreview className='invisble w-0 max-w-lg lg:visible lg:w-full lg:border border-gray-400 rounded h-64'/>
							</Sticky>
						
						</div>


					</div>
				</div>
			</PageErrorBoundary>
		</>
	)
}
export default SearchResultsPage

// calculate screen height
