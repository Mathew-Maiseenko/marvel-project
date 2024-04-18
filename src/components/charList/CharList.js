import { Component } from 'react';
import MarvelServise from '../../services/MarvelServise';
import PropTypes from 'prop-types';

import Spinner from "../spinner/Spinner";

import './charList.scss';

class CharList extends Component {


    service = new MarvelServise()

    state = {
        offset: 210,
        addingLoading: false,
        isEnded: false,
        loading: true,
        charactersList: [],
    }

    componentDidMount() {
        this.setCharacters()
    }

    setNewOffset = () => {
        let {offset} = this.state
        this.setState( () => {
            return {
                offset: offset + 9,
                addingLoading: true,
            }
        }, () => {
            this.setCharacters();
        })
    }

    setCharacters = () => {
        let {offset} = this.state
        this.charactersData = this.service.getNCharatersInInterval(9, offset)
        
        .then(res => {
            this.setState(({charactersList}) => ({
                charactersList: [...charactersList, ...res],
                addingLoading: false,
                loading: false,
                isEnded: (res.length < 9)
            }))
        })
    }
    
    render(){
        let {onSelectingChar} = this.props
        let {charactersList, loading, addingLoading, isEnded} = this.state;
        let result = loading ? <Spinner/> : <CharactersCards charactersList={charactersList} onSelectingChar={onSelectingChar}/>
        return (
            <div className="char__list">
                    {result}
                <button disabled={addingLoading} style={{display: (isEnded)? "none" : null}}
                className="button button__main button__long"
                onClick={this.setNewOffset}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

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



/*             <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item char__item_selected">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li> */