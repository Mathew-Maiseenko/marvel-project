import CharInfo from '../charInfo/CharInfo'
import CharList from '../charList/CharList'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import RandomChar from '../randomChar/RandomChar'

import { useState } from 'react'
import decoration from '../../resources/img/vision.png'

const MainPage = () => {
	let [selectedChar, setSelectedChar] = useState(null)

	function onSelectingChar(id) {
		setSelectedChar(id)
	}

	return (
		<>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<article className='char__content'>
				<ErrorBoundary>
					<CharList onSelectingChar={onSelectingChar} />
				</ErrorBoundary>

				<ErrorBoundary>
					<CharInfo selectedChar={selectedChar} />
				</ErrorBoundary>
			</article>
			<img className='bg-decoration' src={decoration} alt='vision' />
		</>
	)
}

export default MainPage
