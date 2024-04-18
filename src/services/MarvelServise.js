

class MarvelServise {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=8609e16f0bedf75b1c336154989d7539"; 



    getResourse = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw Error(`Cannot fetch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }

    getAllCharaters = async () => {
        const res = await this.getResourse(`${this._apiBase}characters?${this._apiKey}`);
        return res.data.results.map(character => this._getParams(character))
    }

    getNCharatersInInterval = async (count, offset) => {
        //characters?limit=9&offset=19&
        const res = await this.getResourse(`${this._apiBase}characters?limit=${count}&offset=${offset}&${this._apiKey}`);
        return await res.data.results.map(character => this._getParams(character))
    }

    getCharacter = async (id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._getParams(res.data.results[0]);
    }

    _getParams = (char) => ({
        name: char.name,
        description: char.description,
        thubnail: char.thumbnail.path + "." + char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        id: char.id,
        comics: char.comics.items
    })
}

export default MarvelServise;