import React from 'react';
import { getMovies } from '../services/api';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import Loader from 'react-loader-spinner';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: false
    }
  }

  componentWillMount() {
    this.setLoading(true);
    getMovies().then(data => {
      this.setState({
        movies: data
      })
    }).finally(() => {
      this.setLoading(false);
    })
  }

  setLoading = (value) => {
    this.setState({
      isLoading: value
    })
  }

  renderLoading = () => {
    const { isLoading } = this.state;
    if (!isLoading) {
      return;
    }
    return (
      <div className="loading-bar">
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          className="loading"
        />
      </div>
    )
  }

  renderMovies = () => {
    const opts = {
      height: '360',
      width: '100%',
      playerVars: {
        autoplay: 0
      },
      origin: process.env.APP_URL | "http://localhost:3000"
    };
    return this.state.movies.map((movie, index) => {
      return (
        <div className="row mt-3" key={index}>
          <div className="col-md-6">
            <YouTube
              videoId={movie.videoId}
              opts={opts}
            />
          </div>
          <div className="col-md-6 movie-item">
            <label className="col"><span className="badge badge-danger movie-title">{movie.title}</span></label>
            <label className="col">Share by: {movie.user.username}</label>
            <div className="col">
              <label className="mr-3"><span className="badge badge-primary">{movie.likeCount} <FontAwesomeIcon icon={faThumbsUp}/></span></label>
              <label><span className="badge badge-secondary">{movie.dislikeCount} <FontAwesomeIcon icon={faThumbsDown}/></span></label>
            </div>
            <label className="col">Description:</label>
            <label className="col">{movie.description}</label>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="container movies-list">
        {this.renderMovies()}
        {this.renderLoading()}
      </div>
    )
  }
}