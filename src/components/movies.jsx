import React, { Component } from "react";
import { getMovies } from "./../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from './../utils/paginate';

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage:1,
    pageSize: 4
  };

  handleDelete = (movie) => {
    // console.log(movie);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    // this.setState({movies : movies}); //setstate method update state object
    this.setState({ movies }); //if key and value same we can write this way
  };

  handleLike = (movie)=>{
    // console.log("clicked",movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked; //if liked after click became not liked
    this.setState({ movies });

  }

  handlePageChange = (page)=>{
    // console.log(page);
    this.setState({currentPage:page});
  }
  render() {
    const { length : count } = this.state.movies;
    if (count === 0) return <p>There are no movies</p>;

    const movies = paginate(this.state.movies, this.state.currentPage, this.state.pageSize );
    // console.log(movies);
    
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><Like liked={movie.liked} onClick={ () => this.handleLike(movie)}/></td>
                
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
        <Pagination itemsCount={count} pageSize={this.state.pageSize} onPageChange={this.handlePageChange} currentPage={this.state.currentPage}/>
      </React.Fragment>
    );
  }
}

export default Movies;
