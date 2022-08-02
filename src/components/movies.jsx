import React, { Component } from "react";
import { getMovies } from "./../services/fakeMovieService";
// import Like from "./common/like";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from './../utils/paginate';
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import _ from 'lodash';
import { Link, Route } from "react-router-dom";

class Movies extends Component {
  state = {
    // movies: getMovies(),
    movies: [],
    genres: [],
    currentPage:1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: {path: 'title', order: 'asc'}
  };

  componentDidMount(){
    const genres = [{_id:"", name : 'All Genres' }, ...getGenres()];
    this.setState({movies: getMovies(), genres: genres});
    // this.setState({movies: getMovies(), genres: getGenres()});
  }
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

  };

  handlePageChange = (page)=>{
    // console.log(page);
    this.setState({currentPage: page});
  };

  handleGenreSelect = (genre)=>{
    // console.log(genre);
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 }); //selectedGenre new property store genre which select
  };

  handleSort = (sortColumn)=>{
    // console.log(path);
    // const sortColumn = {...this.state.sortColumn};
    // if(sortColumn.path === path) {
    //     sortColumn.order = sortColumn.order ==='asc' ? 'desc' : 'asc';
    // }
    // else{
    //     sortColumn.path = path;
    //     sortColumn.order = 'asc';
    // }
    
    this.setState({sortColumn});

    // this.setState({sortColumn: {path, order : 'asc'}});
  };

  getPageData = ()=>{
    const {selectedGenre, movies: allMovies, sortColumn, currentPage, pageSize, searchQuery} = this.state;
    let filtered = allMovies;
    if(searchQuery)
        filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    else if(selectedGenre && selectedGenre._id)
        filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
    // const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies; // filtered movies based on genre 
    const sorted =  _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize ); 

    return {totalCount: filtered.length, data: movies};
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });

  };

  render() {
    
    const { length : count } = this.state.movies;
    if (count === 0) return <p>There are no movies</p>;

    //const filtered = this.state.selectedGenre && this.state.selectedGenre._id ? this.state.movies.filter(m => m.genre._id === this.state.selectedGenre._id) : this.state.movies; // filtered movies based on genre 
    // const movies = paginate(this.state.movies, this.state.currentPage, this.state.pageSize ); //pass movies array through paginate fumction,there movies array sliced and get 4 items of movies store in new array
    //const sorted =  _.orderBy(filtered, [this.state.sortColumn.path], [this.state.sortColumn.order]);
    //const movies = paginate(sorted, this.state.currentPage, this.state.pageSize ); 
    // const movies = paginate(filtered, this.state.currentPage, this.state.pageSize ); 
    // console.log(movies);
    
    const {totalCount, data: movies} = this.getPageData();

    return (
      <div className="row">
         <div className="col-3">
            <ListGroup 
                items={this.state.genres} 
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
            />
         </div>
         <div className="col">
            {/* <p>Showing {count} movies</p> */}
           
            <Link to='/movies/new'>
                <button className="btn btn-primary" style={{marginBottom:20}} >New Movie</button>
            </Link>
            <p>Showing {totalCount} movies</p>
            <SearchBox value={this.state.searchQuery} onChange={this.handleSearch}  />
            <MoviesTable 
                movies={movies} 
                sortColumn={this.state.sortColumn}
                onLike={this.handleLike} 
                onDelete={this.handleDelete}
                onSort={this.handleSort}
            />
            {/* <table className="table">
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
            
            </table> */}
            <Pagination 
                // itemsCount={count} //For only shows all movies
                itemsCount={totalCount} // after filtering based on genre those filtered array length
                pageSize={this.state.pageSize} 
                onPageChange={this.handlePageChange} 
                currentPage={this.state.currentPage}
            />
        </div>
        
      </div>
    );
  }
}

export default Movies;
