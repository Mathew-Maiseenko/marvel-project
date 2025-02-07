import { Component, useState, useEffect } from 'react';

import './randomChar.scss';
//import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage"

import useMarvelServise from "../../services/MarvelServise";


const RandomChar = () => {

    //let service = useMarvelServise();
    let  {getCharacter, loading, error, clearError} = useMarvelServise();

    let [char, setChar] = useState(null);
    // let [loading, setLoading] = useState(true);
    // let [error, setError] = useState(false)

    useEffect(onSetRandomCharacter, [])

    function getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    } 

    function limitTextLength(str, maxLength){
        if(str.length > maxLength){
            return str.slice(0, maxLength) + "..."
        } else if (str === ""){
            return "There is no information about this character..."
        } else {
            return str;
        }
    }

    // function onCharLoading(){
    //     setLoading(true);
    // }

    function onCharLoaded(char){

        setChar({
            ...char,
            description: limitTextLength(char.description, 210),
        })
        // setLoading(false);
        // setError(false);
    }

    // function onError() {
    //     // setLoading(false);
    //     setError(true)
    // }

    function onSetRandomCharacter() {
        clearError()
        let id = getRandomArbitrary(1011000, 1011400)
        //onCharLoading()
        getCharacter(id)
        .then(onCharLoaded)
        .catch(e => console.error(e))
    }

    let errorMessage = (error) ? <ErrorMessage/> : null;
    let spinner = loading ? <Spinner/> : null;
    let character = !(loading || error) && char? <CharPreview char={char}/> : null;

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
                            onSetRandomCharacter()  
                        }}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
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