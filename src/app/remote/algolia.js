import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch(
	process.env.REACT_APP_ALGOLIA_APP_ID, 
	process.env.REACT_APP_ALGOLIA_SEARCH_KEY
)

const container = {
	client: client,
}

const configShared = {
	removeWordsIfNoResults: 'allOptional',
	advancedSyntax: true,
	typoTolerance: true,
	getRankingInfo: true,
	hitsPerPage: 50,
}

const configIndexes = {
	'users': {
		attributesToRetrieve: ['displayName', 'uid', 'photoURL', 'createdAt'],
		// distinct: 3,
		// attributeForDistinct: 'name',
	},
	'projects': {
		attributesToRetrieve: ['name', 'description', 'uid', 'createdAt'],
		// attributeForDistinct: 'name',
	}
}

// TODO overload client.search (?)
// name: "ApiError", 
// message: "objects must contain params and indexNames attributes.", 

function _buildIndexes(container) {
	Object.entries(configIndexes).forEach((arr) => {
		container[arr[0]] = client.initIndex(arr[0])
		let _tmpFuncSearch = container[arr[0]].search

		container[arr[0]].search = async (query = '', indexConfig = {}, useSharedConfigs = true) => {
			let configs = {}
			if (useSharedConfigs) {
				// Supplied configs:
				// - supplement default index configs
				// - overwrite default index configs
				// - overwrite default shared configs
				Object.assign(configs, arr[1], configShared, indexConfig)
			}
			else {
				// Supplied configs:
				// - supplement default index configs
				// - overwrite default index configs
				Object.assign(configs, arr[1], indexConfig)
			}
			return _tmpFuncSearch(query, configs)
		}
	})
	return container
}

let algolia = null
algolia = algolia || _buildIndexes(container)

export default algolia
