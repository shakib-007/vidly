import React, { Component } from "react";
import { getMovies } from "./../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (movie) => {
    // console.log(movie);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    // this.setState({movies : movies}); //setstate method update state object
    this.setState({ movies }); //if key and value same we can write this way
  };
  render() {
    const { length : count } = this.state.movies;
    if (count === 0) return <p>There are no movies</p>;

    return (
      <React.Fragment> 
        <p>Showing {count} movies</p>
        <table className="table">
          <thead>
            <tr>
              <th>title</th>
              <th>genre</th>
              <th>stock</th>
              <th>rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => {
                      this.handleDelete(movie);
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* <tr>
                    <td>{this.state.movies.map(movie => movie.numberInStock)}</td>
                </tr> */}
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
