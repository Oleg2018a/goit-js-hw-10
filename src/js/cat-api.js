import { hideLoader, showLoader } from './loader';

const API_KEY =
  'live_oHrIS74pYNWjAiD38Hi3W0pSM7IJGybIGcSQ6CpezeUwseYH3a2AEvsBHPImN4tI';
const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  document.querySelector('.breed-select').classList.add('hidden');
  showLoader();

  return fetch(`${BASE_URL}/breeds`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Мережевий запит не був успішним');
      }

      return resp.json();
    })
    .then(data => {
      hideLoader();
      document.querySelector('.breed-select').classList.remove('hidden');
      return data;
    })
    .catch(error => {
      hideLoader();
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  document.querySelector('.cat-info').classList.add('hidden');
  showLoader();

  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Мережевий запит не був успішним');
      }
      return resp.json();
    })
    .then(data => {
      hideLoader();
      document.querySelector('.cat-info').classList.remove('hidden');
      return data[0];
    })
    .catch(error => {
      hideLoader();

      throw error;
    });
}
