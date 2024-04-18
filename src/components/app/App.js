import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

//import MarvelServise from "../../services/MarvelServise";

import decoration from '../../resources/img/vision.png';

//const responce = new MarvelServise();

class App extends Component {

    state = {
        selectedChar: null
    }

    onSelectingChar = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        let {selectedChar} = this.state
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                        <CharList onSelectingChar={this.onSelectingChar}/>
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
}

export default App;