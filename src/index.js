import { Notify } from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { hideErrorMessage, showErrorMessage } from './js/error';

const selectElem = document.querySelector('.breed-select');

function populateBreedSelect(breeds) {
  const optionsHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');

  selectElem.innerHTML = optionsHTML;

  selectElem.addEventListener('change', () => {
    hideErrorMessage();
    const selectedBreedId = selectElem.value;

    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        const catImage = document.querySelector('.cat-image');
        const catBreed = document.querySelector('#cat-breed');
        const catDescription = document.querySelector('#cat-description');
        const catTemperament = document.querySelector('#cat-temperament');

        catImage.src = cat.url;
        catBreed.textContent = cat.breeds[0].name;
        catDescription.textContent = cat.breeds[0].description;
        catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
      })
      .catch(() => {
        showErrorMessage();
        Notify.failure('Помилка при отриманні інформації про породу');
      });
  });
}

fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
  })
  .catch(() => {
    showErrorMessage();
    Notify.failure('Помилка при отриманні інформації про кота ');
  });
