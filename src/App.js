import React from 'react';
import Menu from './components/menu';
import Home from './components/home';
import ShareMovie from './components/share-movie';
import Private from './components/private-component';

import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    const { isLoading } = this.props;
    return (
      <Router>
        {isLoading ? (
          <div className="loading-bar">
            <Loader
              type="Rings"
              color="#00BFFF"
              className="loading"
            />
          </div>
        ) : ""}
        <div>
          <Menu />
          <Route exact path="/" component={Home} />
          {/* <Route path="/share-movie" component={ShareMovie} /> */}
          <Private path="/share-movie" component={ShareMovie}/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.loadingBar.isLoading,
  }
}

export default connect(
  mapStateToProps
)(App)
