import getRatingColor from './getRatingColor';
import appendModalPoster from './appendModalPoster';
import { fetchModal } from './service/moviesAPI';
const showModal = () => {

	const modal = document.querySelector('.modal');
	const movieItem = document.querySelector('.movies__items');
	const moviesInfo = document.querySelector('.modal__info');
	const modalClose = document.querySelector('.modal__close');

	const openModal = () => {
		//moviesInfo.innerHTML = ``;
		modal.classList.remove('visually-hidden');
		modal.classList.add('scroll-hidden');
	}
	const closeModal = () => {
		modal.classList.add('visually-hidden');
		modal.classList.remove('scroll-hidden');
	}
	const closeBackdropModal = (e) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	}
	const checkOverview = (overview) => {
		if (overview) {
			return overview;
		} else {
			return 'Опис фільма відсутній в нашій базі даних, спробуйте знайти його на інших джерелах';
		}
	}
	//---------------------------
	const appendInfoInModal = (response) => {
		moviesInfo.innerHTML = `
		<h2 class="modal__name">${response.title}</h2>
			<div class="modal__poster">
				<img src="${appendModalPoster(response)}" alt="картинка" class="modal__poster-image">
			</div>
			<div class="modal__description">
				<div class="modal__original-title">
					Оригінальна назва:
					<h3 class="original-title">${response.original_title}</h3>
				</div>
				<div class="modal__votes">
					Рейтинг / Голосів:
					<span class="vote ${getRatingColor(response.vote_average)}">${response.vote_average}</span>
					<span class="votes">${response.vote_count}</span>
				</div>
				<div class="modal__popularity">
					Популярність:
					<span class="popularity">${response.popularity}</span>
				</div>
				<div class="modal__overview">
					Опис
					<p class="overview">${checkOverview(response.overview)}</p>
				</div>
			</div>
		`
	};

	const makingRequest = (e) => {
		if (e.target.tagName == "IMG") {
			let targetParent = e.target.parentNode;
			let movieId = targetParent.parentNode.getAttribute('data-id');
			openModal();
			try {
				fetchModal(movieId)
					.then(response => {
						appendInfoInModal(response);
					})
					.catch(e => {
						throw (e)
					})
			} catch (error) {
				alert(error)
			}
		}
	}

	//---------------------------
	movieItem.addEventListener('click', (e) => {
		makingRequest(e);
	})
	//---------------------------
	modalClose.addEventListener('click', closeModal);
	modal.addEventListener('click', (e) => {
		closeBackdropModal(e);
	});
}

export default showModal;