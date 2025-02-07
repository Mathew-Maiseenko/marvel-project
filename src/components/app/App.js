import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage, Page404, SingleComicPage} from "../pages";



const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;













// import ComicsList from "../comicsList/ComicsList"
// import AppHeader from "../appHeader/AppHeader";
// import RandomChar from "../randomChar/RandomChar";
// import CharList from "../charList/CharList";
// import CharInfo from "../charInfo/CharInfo";
// import ErrorBoundary from "../errorBoundary/ErrorBoundary";
// import AppBanner from "../appBanner/AppBanner";
//import decoration from '../../resources/img/vision.png';
//import {useState} from "react";

{/* <div className="app">
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
<AppBanner/>
<ComicsList/>

</div> */}