import useHttp from '../hooks/http.hook'

const useMarvelService = () => {
	const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
	const _apiKey = 'apikey=8609e16f0bedf75b1c336154989d7539'

	let { setRequest, loading, error, clearError, setLoading } = useHttp()

	const _getComicsParams = comic => ({
		title: comic.title,
		description: comic.description,
		thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
		price: comic.prices[0]
			? `${comic.prices[0].price}$`
			: 'There is no information about price...',
		id: comic.id,
		pageCount: comic.pageCount
			? comic.pageCount
			: 'There is no information about this...',
		language: comic.textObjects[0]
			? comic.textObjects.language
			: 'There is no information about this...',
	})

	const _getParams = char => ({
		name: char.name,
		description: char.description,
		thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
		homepage: char.urls[0].url,
		wiki: char.urls[1].url,
		id: char.id,
		comics: char.comics.items,
	})

	const getAllCharacters = async () => {
		const res = await setRequest(`${_apiBase}characters?${_apiKey}`)
		return res.data.results.map(character => _getParams(character))
	}

	const getNCharactersInInterval = async (count, offset) => {
		const res = await setRequest(
			`${_apiBase}characters?limit=${count}&offset=${offset}&${_apiKey}`
		)
		return await res.data.results.map(character => _getParams(character))
	}

	const getNComicsInInterval = async (count, offset) => {
		const res = await setRequest(
			`${_apiBase}comics?limit=${count}&offset=${offset}&${_apiKey}`
		)
		return await res.data.results.map(comic => _getComicsParams(comic))
	}

	const getСomics = async id => {
		const res = await setRequest(`${_apiBase}comics/${id}?${_apiKey}`)

		return _getComicsParams(res.data.results[0])
	}

	const getCharacter = async id => {
		const res = await setRequest(`${_apiBase}characters/${id}?${_apiKey}`)
		return _getParams(res.data.results[0])
	}

	return {
		getCharacter,
		getNCharactersInInterval,
		getСomics,
		getNComicsInInterval,
		getAllCharacters,
		loading,
		error,
		clearError,
		setLoading,
	}
}

export default useMarvelService
