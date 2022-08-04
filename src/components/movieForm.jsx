import React from 'react';
import Joi from 'joi-browser';
import { string } from 'prop-types';
import Form from './common/form';
import { getGenres } from '../services/genreService';
import { getMovie } from '../services/movieService';
import { saveMovie } from '../services/movieService';

class MovieForm extends Form {
   
    state = { 
        data:{title: "", genreId: "", numberInStock: "", dailyRentalRate: ""},
        genres: [],
        errors:{}
    };
     
    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().required().min(0).max(100).label('Number In Stock'),
        dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate')
    };
    /*
    async componentDidMount(){
        const { data: genres} = await getGenres();
        this.setState({ genres });

        const movieId = this.props.match.params.id;
        if(movieId === "new") return;

        try{
            const { data: movie} = await getMovie(movieId);
            this.setState({ data: this.mapToviewModel(movie) });
        }
        catch(ex){
            console.log('aa',ex);
            if(ex.response && ex.response.status === 404) 
                this.props.history.replace("/not-found");
        }
       
    };
    */

    async populateGenres(){
        const { data: genres} = await getGenres();
        this.setState({ genres });
    }

    async populateMovies(){
        try{
            const movieId = this.props.match.params.id;
            if(movieId === "new") return;

            const { data: movie} = await getMovie(movieId);
            this.setState({ data: this.mapToviewModel(movie) });
        }
        catch(ex){
            console.log('aa',ex);
            if(ex.response && ex.response.status === 404) 
                this.props.history.replace("/not-found");
        }
    }

    async componentDidMount(){
        await this.populateGenres();
        await this.populateMovies();
    }


    mapToviewModel =(movie)=>{
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    };

    doSubmit = async () =>{
        await saveMovie(this.state.data);
        this.props.history.push("/movies");
    };
    
    render() { 
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genreId', 'Genre', this.state.genres)}
                    {this.renderInput('numberInStock', 'Number In Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Daily Rental Rate', 'number')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
 
export default MovieForm;









// import React from 'react';
// import { saveMovie } from './../services/fakeMovieService';

// const MovieForm = ({match, history}) => {
//     return (
//         <div>
//             <h1>movie form {match.params.id}</h1>
//             <button className="btn btn-primary" onClick={() => history.push('/movies')}>Save</button>
//         </div>
//         );
// }
 
// export default MovieForm;