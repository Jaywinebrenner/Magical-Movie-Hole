import React, { useEffect, useState } from "react";

const Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movieInput, setMovieInput] = useState("");
  const [director, setDirector] = useState();
    const [actors, setActors] = useState();
    const [poster, setPoster] = useState();




  const movieSubmit = (event) => {
    event.preventDefault();
    fetch("http://www.omdbapi.com/?t=" + movieInput + "&apikey=" + apiKey + "")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("RESUILT", result);
          setIsLoaded(true);
          setDirector(result.Director);
          setActors(result.Actors);
          setPoster(result.Poster)
          console.log("DIRECTOR", director)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  };

  const handleMovieTextInput = (event) => {
    setMovieInput(event.target.value);
  };

  const renderMovieInfo = () => {

  }

  return (
    <div>
      <h1>MOVIE HOLE</h1>
      <h3>Dive deep into the Abyss of the Magical Movie Hole!</h3>
      <form onSubmit={movieSubmit}>
        <label>
          Find the director of your favorite movie!
          <input
            type="text"
            value={movieInput}
            onChange={handleMovieTextInput}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
              {/* <div className="movie-display">
          <h3>{movieInput}</h3>
          <h3> Directed by: {director}</h3>
          <h3>Starring: {actors}</h3>
          <img src={poster} />
          <h3></h3>
          <h3></h3>
        </div> */}
      {renderMovieInfo}

    </div>
  );
};

export default Home;
