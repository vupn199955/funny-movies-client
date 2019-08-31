import React from 'react';
import { shareMovie } from '../services/api';
import { connect } from 'react-redux';
import {
  Redirect
} from 'react-router-dom'

class ShareMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      gotoHome: false
    }
  }

  onChangeUrl = (e) => {
    this.setState({
      url: e.target.value
    })
  }

  shareMovie = (videoId) => {
    this.props.showLoading();
    shareMovie(videoId)
    .finally(() => {
      this.props.hideLoading();
    })
    .then(() => {
      this.setState({
        gotoHome: true
      });
    }).catch(() => {
      this.setState({
        url: ""
      });
      alert("Cannot find your video. Please check it and retry!")
    })
  }

  onShare = () => {
    try {
      const VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      const matchResult = this.state.url.match(VID_REGEX);
      const [, videoId] = matchResult;
      if (!videoId) {
        throw new Error();
      }
      this.shareMovie(videoId);
    } catch(err) {
      this.setState({
        url: ""
      });
      alert("Cannot find your video id. Please check it and retry!")
    }
  }

  render() {
    if (this.state.gotoHome) {
      return (
        <Redirect to="/"/>
      )
    }
    return (
      <div className="container mt-5 border border-dark rounded col-md-8 col-md-offset-2">
        <h2>Share a youtube movie</h2>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Youtube URL</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" placeholder="Youtube URL" value={this.state.url} onChange={this.onChangeUrl}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label"></label>
          <div className="col-sm-10">
            <button className="col btn btn-success" onClick={this.onShare}>Share</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLogin: state.user.isLogin
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  showLoading: () => dispatch({
    type: 'SHOW_LOADING'
  }),
  hideLoading: () => dispatch({
    type: 'HIDE_LOADING'
  })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareMovie)