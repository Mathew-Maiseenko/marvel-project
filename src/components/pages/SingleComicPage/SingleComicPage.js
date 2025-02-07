import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import useMarvelServise from '../../../services/MarvelServise'
import ErrorMessage from '../../errorMessage/ErrorMessage'
import Spinner from '../../spinner/Spinner'

import './singleComic.scss'

const SingleComicPage = () => {
	let { getComix, loading, error, clearError } = useMarvelServise()
	let [comic, setComic] = useState(null)
	let { comicId } = useParams()

	const updateComicInfo = () => {
		clearError()
		getComix(+comicId).then(response => setComic(response))
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
	comic: { title, thubnail, description, pageCount, language, price },
}) => {
	price = +price.slice(0, -1)

	return (
		<div className='single-comic'>
			<img src={thubnail} alt={title} className='single-comic__img' />
			<div className='single-comic__info'>
				<h2 className='single-comic__name'>{title}</h2>
				<p className='single-comic__descr'>
					{description ? description : 'There is no description here...'}
				</p>
				<p className='single-comic__descr'>{pageCount}</p>
				<p className='single-comic__descr'>{`Language: ${language}`}</p>
				<div className='single-comic__price'>
					{price ? `${price}$` : 'There is no information about price...'}
				</div>
			</div>
			<Link to='/comics' className='single-comic__back'>
				Back to all
			</Link>
		</div>
	)
}

export default SingleComicPage

{
	/* <div className="single-comic">
<img src={xMen} alt="x-men" className="single-comic__img"/>
<div className="single-comic__info">
    <h2 className="single-comic__name">X-Men: Days of Future Past</h2>
    <p className="single-comic__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
    <p className="single-comic__descr">144 pages</p>
    <p className="single-comic__descr">Language: en-us</p>
    <div className="single-comic__price">{9.99$}</div>
</div>
<Link to="/comics" className="single-comic__back">Back to all</Link>
</div> */
}
