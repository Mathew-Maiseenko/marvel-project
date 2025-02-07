import { Component, useState, useEffect, useRef } from 'react';
import useMarvelServise from '../../services/MarvelServise';
import PropTypes from 'prop-types';

import Spinner from "../spinner/Spinner";

import './charList.scss';
import { element } from 'prop-types';

function useSelfHook(intialValue) {
    let [value, setValue] = useState(intialValue);

    return {value, setValue}
}

const CharList = ({onSelectingChar}) => {

    const {getNCharatersInInterval, loading, error} = useMarvelServise()
    //const service = useMarvelServise()

    let offset = useSelfHook(210);
    let addingLoading = useSelfHook(false);
    let isEnded = useSelfHook(false);
    //let loading = useSelfHook(true);
    let charactersList = useSelfHook([]);

    // let [offset, setOffset] = useState(210);
    // let [addingLoading, setAddingLoading] = useState(false)
    // let [isEnded, setIsEnded] = useState(false)
    // let [loading, setLoading] = useState(true)
    // let [charactersList, setCharactersList] = useState([])

    const setCharacters = () => {
        getNCharatersInInterval(9, offset.value)
        .then(res => {
            charactersList.setValue(charactersList => [...charactersList, ...res]);
            addingLoading.setValue(false);
            //loading.setValue(false);
            offset.setValue(offset => offset + 9)
            isEnded.setValue(res.length < 9)
        })
    }

    const setNewOffset = () => {
        addingLoading.setValue(true)
        setCharacters();
    }

    useEffect(setCharacters, [])



        let Load = (loading && !addingLoading.value) ? <Spinner/> : null
        let result = <CharactersCards charactersList={charactersList.value} onSelectingChar={onSelectingChar}/>
        return (
            <div className="char__list">
                    {Load}
                    {result}
                <button disabled={addingLoading.value} style={{display: (isEnded.value)? "none" : null}}
                className="button button__main button__long"
                onClick={setNewOffset}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

const CharactersCards = ({charactersList,  onSelectingChar}) => {

    function setRef(idRef) {
        cardsRefs.current.forEach(element => element.classList.remove("char__item_selected"));
        cardsRefs.current[idRef].classList.add("char__item_selected");
        cardsRefs.current[idRef].focus()
    }

    let notInitImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    const cardsRefs = useRef([]);
    let characters = charactersList.map(({name, thubnail, id}, i) => {
        let containStyle = (thubnail === notInitImage) ? {objectFit:"unset"} : null;
        return (
            <li className="char__item" tabIndex={i + 7} 
            key={id} ref={element => cardsRefs.current[i] = element}
             onClick={() => {
                    onSelectingChar(id);
                    setRef(i);
                }}>
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

export {useSelfHook}; 
export default CharList;