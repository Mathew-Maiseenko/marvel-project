import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import useMarvelService from '../../services/MarvelService'

import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner'

import './charInfo.scss'

const CharInfo = ({ selectedChar }) => {
	let { getCharacter, error, loading, clearError, setLoading } =
		useMarvelService()

	let [char, setChar] = useState(null)
	// let [error, setError] = useState(false)

	useEffect(() => {
		updateChar()
		setLoading(false)
	}, [])

	useEffect(() => {
		console.log('обнова информации о персонаже...')
		updateChar()
	}, [selectedChar])

	// const onError = () => {
	//     setLoading(false);
	//     setError(true);
	// }

	// const onCharacterLoading = () => {
	//     setLoading(true)
	// }

	const onCharacterLoaded = char => {
		setChar(char)
	}

	function updateChar() {
		if (!selectedChar) {
			return
		}
		//onCharacterLoading()
		clearError()
		getCharacter(selectedChar).then(res => onCharacterLoaded(res))
		//.catch(onError)
	}

	let skeleton = loading || char || error ? null : <Skeleton />
	let spinner = loading ? <Spinner /> : null
	let errorMessage = error ? <ErrorMessage /> : null
	let content = !char || loading || error ? null : <View char={char} />

	return (
		<div className='char__info'>
			{spinner}
			{skeleton}
			{errorMessage}
			{content}
		</div>
	)
}

CharInfo.propTypes = {
	selectedChar: PropTypes.number,
}

CharInfo.defaultProps = {
	selectedChar: 210,
}

const View = ({ char }) => {
	let { name, description, thumbnail, homepage, wiki, comics } = char
	let notInitImage =
		'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
	let containStyle = thumbnail === notInitImage ? { objectFit: 'unset' } : null
	let comicsList = comics
		.filter((el, i) => i < 10)
		.map((comics, index) => {
			return (
				<li className='char__comics-item' key={index}>
					{comics.name}
				</li>
			)
		})
	return (
		<>
			<div className='char__basics'>
				<img src={thumbnail} alt={name} style={containStyle} />
				<div>
					<div className='char__info-name'>{name}</div>
					<div className='char__btns'>
						<a href={homepage} className='button button__main'>
							<div className='inner'>homepage</div>
						</a>
						<a href={wiki} className='button button__secondary'>
							<div className='inner'>Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className='char__descr'>
				{description !== ''
					? description
					: 'There is no information about this character...'}
			</div>
			<div className='char__comics'>Comics:</div>
			<ul className='char__comics-list'>{comicsList}</ul>
		</>
	)
}

export default CharInfo
