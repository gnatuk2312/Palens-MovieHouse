const appendMovies = (response) => {

	const image_url = "https://image.tmdb.org/t/p/w500";
	const moviesWrapper = document.querySelector('.movies__items');

	const getRatingColor = (vote) => {
		if (vote >= 7) {
			return "green"
		} else if (vote >= 4) {
			return "yellow"
		} else if (vote < 4) {
			return 'red'
		}
	};

	const showMovies = (data) => {

		moviesWrapper.innerHTML = ``;
		data.forEach(movie => {
			const movieCard = document.createElement("ARTICLE");
			movieCard.classList.add('movies__item');
			movieCard.innerHTML = `
				
					<div class="movies__poster">
						<img src="${image_url + movie.poster_path}" alt="Картинка" class="movies__image">
					</div>
					<h3 class="movies__title">${movie.title}</h3>
					<ul class="movies__genres">
						<li class="movies__genre">Мультфільм</li>
						<li class="movies__genre">Комедія</li>
						<li class="movies__genre">Пригоди</li>
					</ul>
					<div class="movies__rating ${getRatingColor(movie.vote_average)}"><span>${movie.vote_average}</span></div>
				`

			moviesWrapper.appendChild(movieCard);
		})
	}

	showMovies(response);
}
export default appendMovies;