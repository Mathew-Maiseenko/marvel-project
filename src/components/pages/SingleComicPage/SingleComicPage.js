import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import useMarvelService from '../../../services/MarvelService'
import ErrorMessage from '../../errorMessage/ErrorMessage'
import Spinner from '../../spinner/Spinner'

import './singleComic.scss'

const SingleComicPage = () => {
	let { getСomics, loading, error, clearError } = useMarvelService()
	let [comic, setComic] = useState(null)
	let { comicId } = useParams()

	const updateComicInfo = () => {
		clearError()
		getСomics(+comicId).then(response => setComic(response))
	}

	useEffect(updateComicInfo, [comicId])

	let comicInfo = !(!comic || loading || error) ? (
		<SingleComicInfo comic={comic} />
	) : null
	let spinner = loading ? <Spinner /> : null
	let errorMessage = error ? <ErrorMessage /> : null

	return (
		<>
			{comicInfo}
			{spinner}
			{errorMessage}
		</>
	)
}

const SingleComicInfo = ({
	comic: { title, thumbnail, description, pageCount, language, price },
}) => {
	price = +price.slice(0, -1)

	return (
		<article className='single-comic'>
			<img src={thumbnail} alt={title} className='single-comic__img' />
			<section className='single-comic__info'>
				<h2 className='single-comic__name'>{title}</h2>
				<p className='single-comic__descr'>
					{description ? description : 'There is no description here...'}
				</p>
				<p className='single-comic__descr'>{pageCount}</p>
				<p className='single-comic__descr'>{`Language: ${language}`}</p>
				<h3 className='single-comic__price'>
					{price ? `${price}$` : 'There is no information about price...'}
				</h3>
			</section>
			<Link to='/comics' className='single-comic__back'>
				Back to all
			</Link>
		</article>
	)
}

export default SingleComicPage
