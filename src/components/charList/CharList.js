import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import useMarvelService from '../../services/MarvelService'

import Spinner from '../spinner/Spinner'

import './charList.scss'

function useSelfHook(initialValue) {
	let [value, setValue] = useState(initialValue)

	return { value, setValue }
}

const CharList = ({ onSelectingChar }) => {
	const { getNCharactersInInterval, loading } = useMarvelService()
	//const service = useMarvelService()

	let offset = useSelfHook(210)
	let addingLoading = useSelfHook(false)
	let isEnded = useSelfHook(false)
	//let loading = useSelfHook(true);
	let charactersList = useSelfHook([])

	const setCharacters = () => {
		getNCharactersInInterval(9, offset.value).then(res => {
			charactersList.setValue(charactersList => [...charactersList, ...res])
			addingLoading.setValue(false)
			//loading.setValue(false);
			offset.setValue(offset => offset + 9)
			isEnded.setValue(res.length < 9)
		})
	}

	const setNewOffset = () => {
		addingLoading.setValue(true)
		setCharacters()
	}

	useEffect(setCharacters, [])

	let Load = loading && !addingLoading.value ? <Spinner /> : null
	let result = (
		<CharactersCards
			charactersList={charactersList.value}
			onSelectingChar={onSelectingChar}
		/>
	)
	return (
		<article className='char__list'>
			{Load}
			{result}
			{!loading && (
				<button
					disabled={addingLoading.value}
					style={{ display: isEnded.value ? 'none' : null }}
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

export { useSelfHook }
export default CharList
