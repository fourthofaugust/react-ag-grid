import React, {Component} from 'react';
import './App.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import Posts from "./pages/Posts";
import Review from "./pages/Review";

class App extends Component {
    render() {
        return (
            <HashRouter>
                 /*
                 a common header can go here
                  */
                <Switch>
                    <Route path="/" exact component={Posts}/>
                    <Route path="/review" component={Review}/>
                </Switch>
                /*
                 a common footer can go here
                  */
            </HashRouter>
        );
    }
}

export default App;
