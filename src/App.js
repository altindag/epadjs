import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getUser } from './services/userServices';
import NavBar from './components/navbar';
import Sidebar from './components/sideBar/sidebar';
import SearchView from './components/searchView/searchView';
import DisplayView from './components/display/displayView';
import AnotateView from './components/anotateView';
import ProgressView from './components/progressView';
import NotFound from './components/notFound';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';
import Cornerstone from './components/cornerstone/cornerstone';
import Management from './components/management/mainMenu';
// import Modal from './components/management/projectCreationForm';
// import Modal from './components/common/rndBootModal';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {
    isMngMenuOpen: false
  };

  closeMenu = event => {
    console.log(event);
    // if (event && event.type === "keydown") {
    //   if (event.key === 'Escape' || event.keyCode === 27) {
    //     this.setState({ isMngMenuOpen: false });
    //   }
    // }
    this.setState({ isMngMenuOpen: false });
  };

  openMenu = () => {
    this.setState(state => ({ isMngMenuOpen: !state.isMngMenuOpen }));
  };

  async componentDidMount() {
    //when comp mount check if the user is set already. If is set then set state
    try {
      const username = sessionStorage.getItem('username');
      if (username) {
        const { data: user } = await getUser(username);
        this.setState({ user });
      }
    } catch (ex) {}

    // window.addEventListener('keydown', this.closeMenu, true);
  }

  componentWillUnmount = () => {
    // window.removeEventListener('keydown', this.closeMenu, true);
  };

  render() {
    return (
      <React.Fragment>
        <Cornerstone />
        <ToastContainer />
        <NavBar user={this.state.user} openGearMenu={this.openMenu} />
        {this.state.isMngMenuOpen && <Management closeMenu={this.closeMenu} />}
        {!this.state.user && <Route path="/login" component={LoginForm} />}
        {this.state.user && (
          <div style={{ display: 'inline', width: '100%', height: '100%' }}>
            <Sidebar>
              <Switch>
                <Route path="/logout" component={Logout} />
                <ProtectedRoute path="/display" component={DisplayView} />
                <ProtectedRoute path="/search/:pid?" component={SearchView} />
                <ProtectedRoute path="/anotate" component={AnotateView} />
                <ProtectedRoute path="/progress" component={ProgressView} />
                <Route path="/tools" />
                <Route path="/edit" />
                <Route path="/not-found" component={NotFound} />
                <ProtectedRoute
                  from="/"
                  exact
                  to="/search"
                  component={SearchView}
                />
                <Redirect to="/not-found" />
              </Switch>
            </Sidebar>
            {/* <Modal /> */}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default App;
