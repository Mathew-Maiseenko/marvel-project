import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import {useState} from "react";

const MainPage = () => {

    let [selectedChar, setSelectedChar] = useState(null)

    function onSelectingChar(id) {
        setSelectedChar(id);
    }


    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onSelectingChar={onSelectingChar}/>
                </ErrorBoundary>

                <ErrorBoundary>
                    <CharInfo selectedChar={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;