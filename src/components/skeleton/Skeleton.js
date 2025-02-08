import './skeleton.scss'

const Skeleton = () => {
	return (
		<>
			<article className='char-non-selected-message'>
				<p className='char__select'>
					Please select a character to see information
				</p>
			</article>
			<article className='skeleton'>
				<section className='pulse skeleton__header'>
					<div className='pulse skeleton__circle'></div>
					<div className='pulse skeleton__mini'></div>
				</section>
				<div className='pulse skeleton__block'></div>
				<div className='pulse skeleton__block'></div>
				<div className='pulse skeleton__block'></div>
			</article>
		</>
	)
}

export default Skeleton
