import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const API_KEY =
  'live_10QEmy9BLynvwHK4L04PPBfqMTHWDlDueww5V0GgkcKr6P0IsIcuc2XckivljNr7';

axios.defaults.headers.common['x-api-key'] = API_KEY;

const refs = {
  selectBreedEl: document.querySelector('.breed-select'),
  catInfoEl: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
};
// Під час завантаження сторінки має виконуватися HTTP-запит за колекцією порід.
// Hеобхідно наповнити select.breed-select опціями, щоб value опції містило id породи, а в інтерфейсі користувачеві відображалася назва породи.
window.addEventListener('load', () => {
  refs.selectBreedEl.classList.add('hidden');
  fetchBreeds()
    .then(cats => {
      const html = cats.reduce((acc, { id, name }) => {
        return acc + `<option value="${id}">${name}</option>`;
      }, '');
      refs.selectBreedEl.insertAdjacentHTML('beforeend', html);
      //можеш використовувати будь-яку бібліотеку з красивими селектом
      new SlimSelect({
        select: '.breed-select',
      });
      refs.loaderEl.classList.add('hidden');
      refs.selectBreedEl.classList.remove('hidden');
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});

// Якщо запит був успішний, під селектом у блоці div.cat-info з'являється зображення і розгорнута інформація про кота: назва породи, опис і темперамент.
refs.selectBreedEl.addEventListener('change', event => {
  fetchCatByBreed(refs.selectBreedEl.value)
    .then(({ catImg, catName, catDescription, catTemperament }) => {
      refs.loaderEl.classList.remove('hidden');
      refs.catInfoEl.innerHTML = '';
      const html = `
      <img src="${catImg}" alt="${catName}" class="cat-img">
      <div class="cat-text-cont"><h2>${catName}</h2>
      <p>${catDescription}</p>
      <p><b>Temperament:</b> ${catTemperament}</p></div>`;
      refs.catInfoEl.insertAdjacentHTML('beforeend', html);
      refs.loaderEl.classList.add('hidden');
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});
