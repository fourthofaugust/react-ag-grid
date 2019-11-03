import React, {Component} from 'react';
import './App.css';
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import {addPost} from "./actions/PostsAction";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    addPost: () => dispatch(addPost())
});

class App extends Component {
  render() {
    return (
        <React.Fragment>
            <HashRouter>
                <Switch>
                    <Route/>
                    <Route/>
                </Switch>
            </HashRouter>
        </React.Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
