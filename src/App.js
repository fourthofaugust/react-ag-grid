import React, {Component} from 'react';
import './App.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import {addPost} from "./actions/PostsAction";
import {connect} from "react-redux";
import Posts from "./pages/Posts";
import Review from "./pages/Review";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    addPost: () => dispatch(addPost())
});

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={Posts}/>
                    <Route path="/review" component={Review}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
