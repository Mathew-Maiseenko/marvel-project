import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelfHook } from '../charList/CharList'

import './comicsList.scss'

import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

const ComicsList = () => {
	let { getNComicsInInterval, loading, error, clearError } = useMarvelService()

	let comicsList = useSelfHook([])
	let offset = useSelfHook(0)

	useEffect(() => {
		onLoadNewComics()
	}, [])

	function onLoadNewComics() {
		clearError()
		getNComicsInInterval(8, offset.value)
			.then(offset.setValue(offset => offset + 8))
			.then(response => comicsList.setValue(comics => [...comics, ...response]))
	}

	let renderComicsList = error ? null : (
		<ComicsCards comicsList={comicsList.value} />
	)
	let spinner =
		loading && !error && comicsList.value.length === 0 ? <Spinner /> : null
	let errorMessage = error && !loading ? <ErrorMessage /> : null

	return (
		<div className='comics__list'>
			{renderComicsList}
			{spinner}
			{errorMessage}

			{!spinner && !errorMessage && (
				<button
					onClick={onLoadNewComics}
					disabled={loading}
					className='button button__main button__long'
				>
					<div className='inner'>load more</div>
				</button>
			)}
		</div>
	)
}

const ComicsCards = ({ comicsList }) => {
	let resultCards = comicsList.map(({ title, thumbnail, price, id }, i) => {
		price = +price.slice(0, -1)
		let priceInfo = price ? price + '$' : 'Price is not available'
		return (
			<li className='comics__item' key={i}>
				<Link to={`/comics/${id}`}>
					<img
						src={thumbnail}
						alt='ultimate war'
						className='comics__item-img'
					/>
					<h3 className='comics__item-name'>{title}</h3>
					<h4 className='comics__item-price'>{priceInfo}</h4>
				</Link>
			</li>
		)
	})
	return <ul className='comics__grid'>{resultCards}</ul>
}

export default ComicsList
