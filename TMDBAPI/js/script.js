document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "a3906c9bdd5a2532c87f7eb54d323e4e";
  let currentPage = 1;

  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      fetchFilms(currentPage);
    }
  });

  nextButton.addEventListener("click", function () {
    currentPage++;
    fetchFilms(currentPage);
  });

  const fetchFilms = async (page) => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=${page}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Impossible de Fetch les films");
        }
        return response.json();
      })
      .then((data) => {
        displayFilms(data.results);
        currentPage = page; //Pour afficher le numero de page
        document.getElementById("current-page").textContent = //MAJ du Numéro
          currentPage; //LETS GOOOOOOOOOOOOOOOOO
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const displayFilms = (films) => {
    const container = document.getElementById("films-container");
    const template = document.getElementById("film-template");

    container.innerHTML = "";

    films.forEach((film) => {
      const filmCard = template.cloneNode(true);
      filmCard.style.display = "block";
      filmCard.querySelector(".film-title").textContent = film.title;
      filmCard.querySelector(".film-description").textContent = film.overview;
      filmCard.querySelector(
        ".film-details-link"
      ).href = `details.html?id=${film.id}`;

      container.appendChild(filmCard);
    });
  };

  fetchFilms(currentPage);
});
