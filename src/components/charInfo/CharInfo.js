import { Component, useState, useEffect } from 'react';
import MarvelServise from '../../services/MarvelServise';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charInfo.scss';

const CharInfo = ({selectedChar}) => {

    let service = new MarvelServise()


    let [char, setChar] = useState(null);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false)

    useEffect(updateChar, [])
    useEffect(() => {
        console.log("обнова");
        updateChar()
    }, [selectedChar])
    

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onCharacterLoading = () => {
        setLoading(true)
    }

    const onCharacterLoaded = (char) => {
        setChar(char)
        setLoading(false);
        setError(false);
    }

    function updateChar(){
        if (!selectedChar) {
           return; 
        }
        onCharacterLoading()
        service.getCharacter(selectedChar)
        .then((res) => onCharacterLoaded(res))
        .catch(onError)
    }

    let skeleton = (loading || char || error) ? null : <Skeleton/>;
    let spinner = loading ? <Spinner/> : null;
    let errorMessage = error ? <ErrorMessage/> : null;
    let content = (!char || loading || error) ? null : <View char={char}/>;

    return (
        <div className="char__info">
            {spinner}
            {skeleton}
            {errorMessage}
            {content}
        </div>
    )
}  

CharInfo.propTypes = {
    selectedChar: PropTypes.number,
}

CharInfo.defaultProps = {
    selectedChar: 210,
};

const View = ({char}) => {
    let {name, description, thubnail, homepage, wiki, comics} = char;
    let notInitImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    let containStyle = (thubnail === notInitImage) ? {objectFit:"unset"} : null;
    let comicsList = comics.filter((el, i) => i < 10).map((comics, index) => {
        return (
            <li className="char__comics-item" key={index}>
                {comics.name}
            </li>
        )
    })
    return (
        <>
            <div className="char__basics">
                    <img src={thubnail} alt={name} style={containStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {(description !== "") ? description : "There is no information about this character..."}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comicsList}
                </ul>
        </>
    )
}



export default CharInfo;













{/* <div className="char__info">
        <div className="char__basics">
            <img src={thor} alt="abyss"/>
            <div>
                <div className="char__info-name">thor</div>
                <div className="char__btns">
                    <a href="#" className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href="#" className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            <li className="char__comics-item">
                All-Winners Squad: Band of Heroes (2011) #3
            </li>
            <li className="char__comics-item">
                Alpha Flight (1983) #50
            </li>
            <li className="char__comics-item">
                Amazing Spider-Man (1999) #503
            </li>
            <li className="char__comics-item">
                Amazing Spider-Man (1999) #504
            </li>
            <li className="char__comics-item">
                AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
            </li>
            <li className="char__comics-item">
                Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
            </li>
            <li className="char__comics-item">
                Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
            </li>
            <li className="char__comics-item">
                Vengeance (2011) #4
            </li>
            <li className="char__comics-item">
                Avengers (1963) #1
            </li>
            <li className="char__comics-item">
                Avengers (1996) #1
            </li>
        </ul>
</div> */}