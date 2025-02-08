import { Link } from 'react-router-dom'
import ErrorMessage from '../errorMessage/ErrorMessage'

const Page404 = () => {
	return (
		<div>
			<ErrorMessage />
			<p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
				Page doesn't exist
			</p>
			<Link
				style={{
					textAlign: 'center',
					fontWeight: 'bold',
					fontSize: '24px',
					display: 'block',
					marginTop: '30px',
				}}
				to='/'
			>
				Back to the start page
			</Link>
		</div>
	)
}

export default Page404
