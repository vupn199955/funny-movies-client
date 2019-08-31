import React from 'react';
import { connect } from 'react-redux';
import { login, getUserInfo } from '../services/api';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { argumentPlaceholder } from '@babel/types';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  login = () => {
    const { username, password } = this.state;
    if (!username || !password) {
      return alert('Missing field!');
    }
    this.props.showLoading();
    const body = {
      username,
      password
    }
    login(body)
    .finally(() => {
      this.props.hideLoading();
    })
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        this.props.login(res.username);
      }
    }).catch(err => {
      alert("Login fail! Please check your info.");
    })
  }

  componentWillMount() {
    if (!localStorage.getItem('token')) return;
    this.props.showLoading();
    getUserInfo()
    .finally(() => {
      this.props.hideLoading();
    })
    .then(res => {
      if (res.username) {
        this.props.login(res.username);
      }
    })
  }

  onChangeUsername = (e) => {
    this.setState({username: e.target.value});
  }

  onChangePassword = (e) => {
    this.setState({password: e.target.value});
  }

  logout = () => {
    this.props.logout();
  }

  render() {
    const { isLogin, username } = this.props;
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            <FontAwesomeIcon icon={faHome}/>
            <span className="ml-2">Funny Movies</span>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            </ul>
              {!isLogin ? (
                <div className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" value={this.state.username} onChange={this.onChangeUsername} type="username" placeholder="Username"/>
                  <input className="form-control mr-sm-2" value={this.state.password} onChange={this.onChangePassword} type="password" placeholder="Password"/>
                  <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.login}>Login/Register</button>
                </div>
              ) : (
                <div className="form-inline my-2 my-lg-0">
                  <label className="label mr-5"> Welcome {username}</label>
                  <Link className="btn btn-outline-success my-2 my-sm-0 mr-5" to="/share-movie">Share a movie</Link>
                  <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.logout}>Logout</button>
                </div>    
              )}
          </div>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.user.username,
    isLogin: state.user.isLogin
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch({
    type: "LOGOUT"
  }),
  login: (data) => dispatch({
    type: "LOGIN",
    data
  }),
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
)(Menu)