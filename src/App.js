import React, {Component} from 'react';
import './App.css';
import PostsGrid from "./components/PostsGrid";

class App extends Component {
  render() {
    return (
        <React.Fragment>
            <PostsGrid>
            </PostsGrid>
        </React.Fragment>
    );
  }
}
export default App;
