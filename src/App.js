import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './components/movies';
import NavBar from './components/common/navbar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <React.Fragment>
        <ToastContainer />
        <NavBar/>
        <main className='container'>
            <Switch>
                <Route path="/login" component={LoginForm}></Route>
                <Route path="/register" component={RegisterForm}></Route>
                <Route path="/movies/:id" component={MovieForm}></Route>
                <Route path="/movies/new" component={MovieForm}></Route>
                <Route path="/movies" component={Movies}></Route>
                <Route path="/customers" component={Customers}></Route>
                <Route path="/rentals" component={Rentals}></Route>
                <Route path="/not-found" component={NotFound}></Route>
                <Redirect from='/' exact to='/movies' />
                <Redirect to='/not-found' />
            </Switch>
        </main>
    </React.Fragment>
  );
}

export default App;
