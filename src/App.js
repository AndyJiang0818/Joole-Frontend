import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Signin from "./components/signin.component";
import Signup from "./components/signup.component";
import { Search } from "./components/search.component";

import ProductSelected from "./components/showproduct.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());

    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router history={history}>
        <div className="App">
          <nav className="navbar navbar-expand">
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <h5 to={"/search"} className="nav-link">
                    {currentUser.username}
                  </h5>
                </li>

                <li className="nav-item">
                  <Link to={"/search"} className="nav-link">
                    Search
                  </Link>
                </li>

                <li className="nav-item">
                  <a href="/signin" className="nav-link" onClick={this.logOut}>
                    Logout
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link
                    to={"/signin"}
                    className="nav-link"
                    style={{ color: "black" }}
                  >
                    Sign In
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to={"/signup"}
                    className="nav-link"
                    style={{ color: "black" }}
                  >
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/" component={Signin} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/search" component={Search} />
              <Route
                exact
                path="/productSelected"
                component={ProductSelected}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
