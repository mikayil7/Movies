import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import axios from "axios";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class App extends React.Component {
  state = {
    movies: [],

    search: "",
  };

  async componentDidMount() {
    const response = await axios.get(" http://localhost:3002/movies");
    this.setState({ movies: response.data });
  }

  // delete movie
  deleteMovie = async (movie) => {
    axios.delete(`http://localhost:3002/movies/${movie.id}`);
    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);
    this.setState({
      movies: newMovieList,
    });
  };

  // search movie
  searchMovie = (event) => {
    this.setState({ search: event.target.value });
  };

  // add movie
  addMovie = async (movie) => {
    axios.post(`http://localhost:3002/movies/`, movie);
    this.setState((state) => ({
      movies: state.movies.concat([movie]),
    }));
  };

  render() {
    let filteredMovies = this.state.movies.filter(
      (movie) => {
            return  movie.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 }
      ).sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      })
    

    return (
      <Router>
        <div className="container">
          <Routes>
            <Route
              path="/"
              exact
              element={
                <>
                  <SearchBar searchMovieProp={this.searchMovie} />
                  <MovieList
                    movies={filteredMovies}
                    deleteMovieProp={this.deleteMovie}
                  />
                </>
              }
              render={() => (
                <React.Fragment>
                  <div className="row">
                    <div className="col-lg-12">
                      <SearchBar searchMovieProp={this.searchMovie} />
                    </div>
                  </div>

                  <MovieList
                    movies={filteredMovies}
                    deleteMovieProp={this.deleteMovie}
                  />
                </React.Fragment>
              )}
            ></Route>

            <Route
              path="/add"
              element={
                <AddMovie
                  onAddMovie={(movie) => {
                    this.addMovie(movie);
                  }}
                />
              }
              render={() => <AddMovie />}
            />

            <Route path="/edit/:id" element={<EditMovie/>}>

            </Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
