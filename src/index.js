
import { Notify } from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { hideErrorMessage, showErrorMessage } from './js/error';
import { showLoader, hideLoader } from './js/loader';

const selectElem = document.querySelector('.breed-select');
 const catImage = document.querySelector('.cat-image');
 const catBreed = document.querySelector('#cat-breed');
 const catDescription = document.querySelector('#cat-description');
 const catTemperament = document.querySelector('#cat-temperament');

function clearCatInfo() {
  catImage.src = '';
  catBreed.textContent = '';
  catDescription.textContent = '';
  catTemperament.textContent = '';
}
function populateBreedSelect(breeds) {
  const optionsHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');

  selectElem.innerHTML = optionsHTML;

  selectElem.addEventListener('change', () => {

    hideErrorMessage();
    const selectedBreedId = selectElem.value;
    clearCatInfo();
    
    document.querySelector('.cat-info').classList.add('hidden');
    showLoader();

    fetchCatByBreed(selectedBreedId)
      .then(data => {
        hideLoader();
        document.querySelector('.cat-info').classList.remove('hidden');
        return data[0];
      })
      .then(cat => {
        catImage.src = cat.url;
        catBreed.textContent = cat.breeds[0].name;
        catDescription.textContent = cat.breeds[0].description;
        catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
      })

      .catch(() => {
        hideLoader();
        showErrorMessage();
        Notify.failure('Помилка при отриманні інформації про породу');
        clearCatInfo();
      });

  });
}
document.querySelector('.breed-select').classList.add('hidden');
  showLoader();

fetchBreeds()
  .then(data => {
    hideLoader();
    document.querySelector('.breed-select').classList.remove('hidden');
    return data;
  })
  .then(breeds => {
    populateBreedSelect(breeds);
  })

  .catch(() => {
    hideLoader();
    showErrorMessage();
    Notify.failure('Помилка при отриманні інформації про кота ');
    clearCatInfo();
  });
   