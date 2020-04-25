import React from 'react'
import {
	Dropdown,
	Flag,
} from 'semantic-ui-react'

const countryOptions = [
  { key: 'us', value: 'us', flag: 'us', text: 'English' },
  { key: 'cn', value: 'cn', flag: 'cn', text: 'Mandarin' },
  { key: 'ru', value: 'ru', flag: 'ru', text: 'Russian' },
  { key: 'es', value: 'es', flag: 'es', text: 'Spanish' },
  { key: 'de', value: 'de', flag: 'de', text: 'German' },
  { key: 'fr', value: 'fr', flag: 'fr', text: 'French' },
  { key: 'ae', value: 'ae', flag: 'ae', text: 'Arabic' },
  { key: 'in', value: 'in', flag: 'in', text: 'Hindi' },
  { key: 'kr', value: 'kr', flag: 'kr', text: 'Korean' },
  { key: 'jp', value: 'jp', flag: 'jp', text: 'Japanese' },
]

const LanguageSelector = ({ ...props }) => (
	<>
		<Dropdown
		selection
		options={countryOptions}
		/>
	</>
)

export default LanguageSelector
