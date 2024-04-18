import { Component } from 'react';

import './randomChar.scss';
//import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage"

import MarvelServise from "../../services/MarvelServise";


class RandomChar extends Component {

    service = new MarvelServise();

    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.onSetRandomCharacter();
    } 

    getRandomArbitrary = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    } 

    limitTextLength = (str, maxLength) => {
        if(str.length > maxLength){
            return str.slice(0, maxLength) + "..."
        } else if (str === ""){
            return "There is no information about this character..."
        } else {
            return str;
        }
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char: {
                ...char,
                description: this.limitTextLength(char.description, 210),
            },
            loading: false,
            error: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onSetRandomCharacter = () => {
        let id = this.getRandomArbitrary(1011000, 1011400)
        this.onCharLoading()
        this.service.getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }

    render() {
        let {char, loading, error} = this.state;
        let errorMessage = (error && !loading) ? <ErrorMessage/> : null;
        let spinner = loading ? <Spinner/> : null;
        let character = !(loading || error)? <CharPreview char={char}/> : null;
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {character}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button tabIndex={6}
                    className="button button__main"
                    onClick={(e) => {
                                e.preventDefault();
                                this.onSetRandomCharacter()  
                            }}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const CharPreview = ({char}) => {
    let {name, description, thubnail, homepage, wiki} = char;
    let notInitImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    let containStyle = (thubnail === notInitImage) ? {objectFit:"contain"} : null;

    return (
        <div className="randomchar__block">
            <img src={thubnail} alt="Random character" className="randomchar__img" style={containStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main"
                    tabIndex={4}>
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary"
                    tabIndex={5}>
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;