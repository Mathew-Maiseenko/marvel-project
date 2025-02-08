import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import useMarvelService from '../../services/MarvelService'

import Spinner from '../spinner/Spinner'

import './charList.scss'

const CharList = ({ onSelectingChar }) => {
	const { getNCharactersInInterval, loading } = useMarvelService()

	let [offset, setOffset] = useState(210)
	let [addingLoading, setAddingLoading] = useState(false)
	let [isEnded, setIsEnded] = useState(false)
	let [charactersList, setCharactersList] = useState([])

	const setCharacters = () => {
		getNCharactersInInterval(9, offset).then(res => {
			setCharactersList(charactersList => [...charactersList, ...res])
			setAddingLoading(false)
			setOffset(offset => offset + 9)
			setIsEnded(res.length < 9)
		})
	}

	const setNewOffset = () => {
		setAddingLoading(true)
		setCharacters()
	}

	useEffect(setCharacters, [])

	let Load = loading && !addingLoading ? <Spinner /> : null
	let result = (
		<CharactersCards
			charactersList={charactersList}
			onSelectingChar={onSelectingChar}
		/>
	)
	return (
		<article className='char__list'>
			{Load}
			{result}
			{!loading && (
				<button
					disabled={addingLoading}
					style={{ display: isEnded ? 'none' : null }}
					className='button button__main button__long'
					onClick={setNewOffset}
				>
					<div className='inner'>load more</div>
				</button>
			)}
		</article>
	)
}

const CharactersCards = ({ charactersList, onSelectingChar }) => {
	function setRef(idRef) {
		cardsRefs.current.forEach(element =>
			element.classList.remove('char__item_selected')
		)
		cardsRefs.current[idRef].classList.add('char__item_selected')
		cardsRefs.current[idRef].focus()
	}

	let notInitImage =
		'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
	const cardsRefs = useRef([])
	let characters = charactersList.map(({ name, thumbnail, id }, i) => {
		let containStyle =
			thumbnail === notInitImage ? { objectFit: 'unset' } : null
		return (
			<li
				className='char__item'
				tabIndex={i + 7}
				key={id}
				ref={element => (cardsRefs.current[i] = element)}
				onClick={() => {
					onSelectingChar(id)
					setRef(i)
				}}
			>
				<img src={thumbnail} alt={name} style={containStyle} />
				<p className='char__name'>{name}</p>
			</li>
		)
	})

	return <ul className='char__grid'>{characters}</ul>
}

CharList.propTypes = {
	onSelectingChar: PropTypes.func.isRequired,
}
export default CharList
