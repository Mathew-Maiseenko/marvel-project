import {useState} from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

//import MarvelServise from "../../services/MarvelServise";

import decoration from '../../resources/img/vision.png';

//const responce = new MarvelServise();

const App = () => {


    let [selectedChar, setSelectedChar] = useState(null)

    function onSelectingChar(id) {
        setSelectedChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
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
            </main>
        </div>
    )
}

export default App;