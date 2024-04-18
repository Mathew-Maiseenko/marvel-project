import { Component, useState, useEffect } from 'react';
import MarvelServise from '../../services/MarvelServise';
import PropTypes from 'prop-types';

import Spinner from "../spinner/Spinner";

import './charList.scss';

const CharList = ({onSelectingChar}) => {


    const service = new MarvelServise()

    let [offset, setOffset] = useState(210);
    let [addingLoading, setAddingLoading] = useState(false)
    let [isEnded, setIsEnded] = useState(false)
    let [loading, setLoading] = useState(true)
    let [charactersList, setCharactersList] = useState([])

    const setCharacters = () => {
        service.getNCharatersInInterval(9, offset)
        .then(res => {
            setCharactersList(charactersList => [...charactersList, ...res]);
            setAddingLoading(false);
            setLoading(false);
            setOffset(offset => offset + 9)
            setIsEnded(res.length < 9)
        })
    }

    const setNewOffset = () => {
        setAddingLoading(true)
        setCharacters();
    }

    useEffect(setCharacters, [])



        let result = loading ? <Spinner/> : <CharactersCards charactersList={charactersList} onSelectingChar={onSelectingChar}/>
        return (
            <div className="char__list">
                    {result}
                <button disabled={addingLoading} style={{display: (isEnded)? "none" : null}}
                className="button button__main button__long"
                onClick={setNewOffset}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

const CharactersCards = ({charactersList,  onSelectingChar}) => {
    let notInitImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    let characters = charactersList.map(({name, thubnail, id}, i) => {
        let containStyle = (thubnail === notInitImage) ? {objectFit:"unset"} : null;
        //tabIndex={i}
        return (
            <li className="char__item" tabIndex={i + 7}
            key={id} onClick={() => onSelectingChar(id)}>
                <img src={thubnail} alt={name} style={containStyle}/>
                <div className="char__name">{name}</div>
            </li>
        )
    })

    return (
        <ul className="char__grid">
            {characters}
        </ul>
    )
}

CharList.propTypes = {
    onSelectingChar: PropTypes.func.isRequired,
}


export default CharList;