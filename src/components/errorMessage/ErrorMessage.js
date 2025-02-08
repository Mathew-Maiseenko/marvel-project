import errorImg from './error.gif'

const ErrorMessage = () => {
	return (
		<img
			src={errorImg}
			alt='Сообщение об ошибке'
			style={{
				display: 'block',
				height: '250px',
				width: '250px',
				objectFit: 'contain',
				margin: '0 auto',
			}}
		/>
	)
}

export default ErrorMessage
