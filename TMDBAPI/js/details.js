document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "a3906c9bdd5a2532c87f7eb54d323e4e";
  const urlParams = new URLSearchParams(window.location.search); //bv nico
  const filmId = urlParams.get("id");

  const fetchFilm = async (id) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr-FR`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Impossible de Fetch les films");
        }
        return response.json();
      })
      .then((data) => {
        displayFilm(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const displayFilm = async (film) => {
    const container = document.getElementById("film-details");
    container.querySelector(".film-title").textContent = film.title;
    container.querySelector(".film-description").textContent = film.overview;
  };

  fetchFilm(filmId);
});
