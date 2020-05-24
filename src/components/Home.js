import React, { useEffect, useState, StyleSheet } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import index from '../index.css'


const homeWrapper = {
  color: "#2E42BE",
 
};
const submitButton = {
    display: "inline-block",
    marginTop: "11px"
};
const textField = {
  display: "block,",
  marginRight: "20px",
};
const paper = {
    padding: 'theme.spacing(2)',
    textAlign: "center",
    color: 'theme.palette.text.secondary',
}
const image = {
    width: '150px',
    marginTop: '30px',
    borderRadius: '5px'
}
const directorText = {
    marginBottom: '0px',
}
const imageWrapper = {
  color: "#2E42BE",
  width: '360px'
};
const titleText = {
    // fontFamily: "Monoton",
    fontSize: '5000px'
}




const Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movieInput, setMovieInput] = useState("");
  const [title, setTitle] = useState();
  const [director, setDirector] = useState();
  const [actors, setActors] = useState();
  const [poster, setPoster] = useState();
  const [year, setYear] = useState();
  const [rated, setRated] = useState();
  const [runtime, setRuntime] = useState();

  console.log("API", process.env.REACT_APP_API_KEY);

  // Need REACT_APP in front of env variable while defining it in terminal
  const apiKey = process.env.REACT_APP_API_KEY;

  const movieSubmit = (event) => {
    event.preventDefault();
    fetch("http://www.omdbapi.com/?t=" + movieInput + "&apikey=" + apiKey + "")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("RESUILT", result);
          setIsLoaded(true);
          setTitle(result.Title);
          setDirector(result.Director);
          setActors(result.Actors);
          setPoster(result.Poster);
          setYear(result.Year);
          setRated(result.Rated);
          setRuntime(result.Runtime);
          if (result.Response === "False") {
            alert("This movie only exists in your mind");
          }
          console.log("DIRECTOR", director);
          setMovieInput("");
        },
        (error) => {
          console.log("EORRO", error);
          setIsLoaded(true);
          setError(error);
        },
      );
  };

  const handleMovieTextInput = (event) => {
    setMovieInput(event.target.value);
  };

  const renderMovieInfo = () => {
    if (isLoaded && title) {
      return (
        <Container maxWidth="sm">
          <h3>{title}</h3>
          <h5 className={directorText}> Directed by: {director}</h5>
          <h5 className="actors">Starring: {actors}</h5>

          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={paper}>Rated: {rated}</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={paper}>Year: {year}</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={paper}>Runtime: {runtime}</Paper>
            </Grid>
          </Grid>
          <Container className={imageWrapper}>
            <img style={image} src={poster} />
          </Container>
        </Container>
      );
    }
  };

  return (
    <div style={homeWrapper}>
      <h1 className={titleText}>MOVIE HOLE</h1>
      <h3>Dive deep into the Abyss of the Magical Movie Hole!</h3>
      <form onSubmit={movieSubmit}>
        <TextField
          style={textField}
          id="outlined-basic"
          label="Find your favorite movie"
          variant="outlined"
          type="text"
          value={movieInput}
          onChange={handleMovieTextInput}
        />
        <Button
          style={submitButton}
          type="submit"
          value="Submit"
          variant="contained"
          color="primary"
        >
          Primary
        </Button>
      </form>
      {renderMovieInfo()}
    </div>
  );
};


export default Home;
