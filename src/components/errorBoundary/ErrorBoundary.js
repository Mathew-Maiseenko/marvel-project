import { Component } from 'react'
import ErrorMessage from '../errorMessage/ErrorMessage'

class ErrorBoundary extends Component {
	state = {
		error: false,
	}

	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo)
		this.setState({
			error: true,
		})
	}

	render() {
		let { error } = this.state
		return error ? <ErrorMessage /> : this.props.children
	}
}

export default ErrorBoundary
