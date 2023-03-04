var movieApp = new Vue({
  el: "#movieApp",
  data: {
    searchedMovie: "", // Texto ingresado por el usuario.
    movieWasSearched: false,
    movieIsBeingSearched: false,
    movie: {},
  },
});

// BUSCAR PELÍCULA:
function searchMovie(event) {
  // La siguiente línea de código previene que se "envie" el formulario (y se recargue la página).
  event.preventDefault();

  movieApp.movieIsBeingSearched = true;

  var urlMovies =
    "https://private.omdbapi.com/?plot=full&apikey=bef9c583&t=" +
    movieApp.searchedMovie;

  fetch(urlMovies)
    .then(function (datosObtenidos) {
      // En el parámetro 'datosObtenidos' vienen los datos de la película en formato JSON.
      // El nombre de este parámetro es arbitrario.
      return datosObtenidos.json();
    })
    .then(function (movie) {
      // En el parámetro 'movie' viene un objeto de los datos de la película.
      // El nombre de este parámetro es arbitrario.
      console.log("Película", movie); // Test: se muestra la película en la consola.
      movieApp.movie = movie; // Se guarda la película en Vue.js.
    })
    .catch(function (error) {
      alert(error); // Se muestra un alert en caso de error.
    })
    .then(function () {
      movieApp.movieWasSearched = true;
      movieApp.movieIsBeingSearched = false;
    });
} // End - Search Movie
