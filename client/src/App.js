import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Alert from './components/alert';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import { loadUser } from './components/actions/auth'
import Dashboard from './components/dashboard/dashboard';
import PrivateRoute from './components/routing/privateRoute';
import CreateProfile from './components/profile-form/createProfile';
import EditProfile from './components/profile-form/edit-profile';
import AddExperience from './components/profile-form/addExperience';
import AddEducation from './components/profile-form/addEducation';
import Profiles from './components/profiles/profiles';
import Profile from './components/profile/profile';
import setAuthToken from './util/setAuthToken';
import Posts from './components/posts/posts';
import Post from './components/post/post';
const App = () => {

  useEffect(() => {
    setAuthToken(localStorage.token);


    store.dispatch(loadUser());
  }, []);

  return (<Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />

              <PrivateRoute exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/profiles" component={Profiles} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
          </section>
        </Switch>
      </Fragment>
    </Router>
  </Provider>
  )
}


export default App;
