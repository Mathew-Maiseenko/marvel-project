import { useState, useEffect } from 'react';
import { useSelfHook } from '../charList/CharList';
import { Link } from 'react-router-dom';

import './comicsList.scss';

import useMarvelServise from '../../services/MarvelServise';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {

    let {getNComicsInInterval, loading, error, clearError, setLoading} = useMarvelServise()

    let comicsList = useSelfHook([]);
    let offset = useSelfHook(0);

    useEffect(() => {
        onLoadNewComics();
    }, [])


    function onLoadNewComics() {
        clearError();
        getNComicsInInterval(8, offset.value)
        .then(offset.setValue((offset) => offset + 8))
        .then(response => comicsList.setValue( (comics) => [...comics, ...response] ))
    }

    let renderComicsList = (error) ? null : <ComicsCards comicsList={comicsList.value}/>;
    let spinner = (loading && !error && comicsList.value.length === 0) ? <Spinner/> : null;
    let errorMessage = (error && !loading) ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
            {renderComicsList}
            {spinner}
            {errorMessage}
            <button onClick={onLoadNewComics}
            disabled={loading}
            className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const ComicsCards = ({comicsList}) => {
    let resultCards = comicsList.map(({title, url, thubnail, price, id}, i) => {
        price = +price.slice(0 , -1)
        let priceInfo = price ? (price + "$") : "Price is not available"
        return (
            <li className="comics__item" key={i}>
                <Link to={`/comics/${id}`}>
                    <img src={thubnail} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{priceInfo}</div>
                </Link>
            </li>
        )
    })
    return (
        <ul className="comics__grid">
            {resultCards}
        </ul>
    )
}

export default ComicsList;


{/* <div className="comics__list">
<ul className="comics__grid">
    <li className="comics__item">
        <a href="#">
            <img src={uw} alt="ultimate war" className="comics__item-img"/>
            <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
            <div className="comics__item-price">9.99$</div>
        </a>
    </li>
    <li className="comics__item">
        <a href="#">
            <img src={xMen} alt="x-men" className="comics__item-img"/>
            <div className="comics__item-name">X-Men: Days of Future Past</div>
            <div className="comics__item-price">NOT AVAILABLE</div>
        </a>
    </li>
    <li className="comics__item">
        <a href="#">
            <img src={uw} alt="ultimate war" className="comics__item-img"/>
            <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
            <div className="comics__item-price">9.99$</div>
        </a>
    </li>
    <li className="comics__item">
        <a href="#">
            <img src={xMen} alt="x-men" className="comics__item-img"/>
            <div className="comics__item-name">X-Men: Days of Future Past</div>
            <div className="comics__item-price">NOT AVAILABLE</div>
        </a>
    </li>
    <li className="comics__item">
        <a href="#">
            <img src={uw} alt="ultimate war" className="comics__item-img"/>
            <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
            <div className="comics__item-price">9.99$</div>
        </a>
    </li>
    <li className="comics__item">
        <a href="#">
            <img src={xMen} alt="x-men" className="comics__item-img"/>
            <div className="comics__item-name">X-Men: Days of Future Past</div>
            <div className="comics__item-price">NOT AVAILABLE</div>
        </a>
    </li>
    <li className="comics__item">
        <a href="#">
            <img src={uw} alt="ultimate war" className="comics__item-img"/>
            <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
            <div className="comics__item-price">9.99$</div>
        </a>
    </li>
    <li className="comics__item">
        <a href="#">
            <img src={xMen} alt="x-men" className="comics__item-img"/>
            <div className="comics__item-name">X-Men: Days of Future Past</div>
            <div className="comics__item-price">NOT AVAILABLE</div>
        </a>
    </li>
</ul>
<button className="button button__main button__long">
    <div className="inner">load more</div>
</button>
</div> */}