import { useEffect, useState } from 'react'

import './randomChar.scss'
//import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png'

import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

import useMarvelService from '../../services/MarvelService'

const RandomChar = () => {
	//let service = useMarvelService();
	let { getCharacter, loading, error, clearError } = useMarvelService()

	let [char, setChar] = useState(null)
	// let [loading, setLoading] = useState(true);
	// let [error, setError] = useState(false)

	useEffect(onSetRandomCharacter, [])

	function getRandomArbitrary(min, max) {
		return Math.round(Math.random() * (max - min) + min)
	}

	function limitTextLength(str, maxLength) {
		if (str.length > maxLength) {
			return str.slice(0, maxLength) + '...'
		} else if (str === '') {
			return 'There is no information about this character...'
		} else {
			return str
		}
	}

	// function onCharLoading(){
	//     setLoading(true);
	// }

	function onCharLoaded(char) {
		setChar({
			...char,
			description: limitTextLength(char.description, 210),
		})
		// setLoading(false);
		// setError(false);
	}

	// function onError() {
	//     // setLoading(false);
	//     setError(true)
	// }

	function onSetRandomCharacter() {
		clearError()
		let id = getRandomArbitrary(1011000, 1011400)
		//onCharLoading()
		getCharacter(id)
			.then(onCharLoaded)
			.catch(e => console.error(e))
	}

	let errorMessage = error ? <ErrorMessage /> : null
	let spinner = loading ? <Spinner /> : null
	let character =
		!(loading || error) && char ? <CharPreview char={char} /> : null

	return (
		<article className='randomchar'>
			{errorMessage}
			{spinner}
			{character}
			<section className='randomchar__static'>
				<p className='randomchar__title'>
					Random character for today!
					<br />
					Do you want to get to know him better?
				</p>
				<p className='randomchar__title'>Or choose another one</p>
				<button
					tabIndex={6}
					className='button button__main'
					onClick={e => {
						e.preventDefault()
						onSetRandomCharacter()
					}}
				>
					<p className='inner'>try it</p>
				</button>
				<img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
			</section>
		</article>
	)
}

const CharPreview = ({ char }) => {
	let { name, description, thumbnail, homepage, wiki } = char
	let notInitImage =
		'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
	let containStyle =
		thumbnail === notInitImage ? { objectFit: 'contain' } : null

	return (
		<article className='randomchar__block'>
			<img
				src={thumbnail}
				alt='Random character'
				className='randomchar__img'
				style={containStyle}
			/>
			<section className='randomchar__info'>
				<p className='randomchar__name'>{name}</p>
				<p className='randomchar__descr'>{description}</p>
				<div className='randomchar__btns'>
					<a href={homepage} className='button button__main' tabIndex={4}>
						<h4 className='inner'>homepage</h4>
					</a>
					<a href={wiki} className='button button__secondary' tabIndex={5}>
						<h4 className='inner'>Wiki</h4>
					</a>
				</div>
			</section>
		</article>
	)
}

export default RandomChar
