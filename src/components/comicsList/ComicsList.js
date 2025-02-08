import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './comicsList.scss'

import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

const ComicsList = () => {
	let { getNComicsInInterval, loading, error, clearError } = useMarvelService()

	let [comicsList, setComicsList] = useState([])
	let [offset, setOffset] = useState(0)

	useEffect(() => {
		onLoadNewComics()
	}, [])

	function onLoadNewComics() {
		clearError()
		getNComicsInInterval(8, offset)
			.then(setOffset(offset => offset + 8))
			.then(response => setComicsList(comics => [...comics, ...response]))
	}

	let renderComicsList = error ? null : <ComicsCards comicsList={comicsList} />
	let spinner =
		loading && !error && comicsList.length === 0 ? <Spinner /> : null
	let errorMessage = error && !loading ? <ErrorMessage /> : null

	return (
		<article className='comics__list'>
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
		</article>
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
