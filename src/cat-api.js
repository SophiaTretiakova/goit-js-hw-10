import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_10QEmy9BLynvwHK4L04PPBfqMTHWDlDueww5V0GgkcKr6P0IsIcuc2XckivljNr7';
// index.js Під час завантаження сторінки має виконуватися HTTP-запит за колекцією порід.
// Для цього необхідно виконати GET - запит на ресурс https://api.thecatapi.com/v1/breeds, що повертає масив об'єктів.
// index.js У разі успішного запиту, необхідно наповнити select.breed-select опціями так,
// щоб value опції містило id породи, а в інтерфейсі користувачеві відображалася назва породи.
// Напиши функцію fetchBreeds(), яка виконує HTTP-запит і повертає проміс із масивом порід - результатом запиту.
// Винеси її у файл cat-api.js та зроби іменований експорт.
function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      // handle success
      return response.data;
    })
    .then(data => {
      return data.map(cat => {
        return { id: cat.id, name: cat.name };
      });
    });
}
// Коли користувач обирає якусь опцію в селекті, необхідно виконувати запит за повною інформацією про кота на ресурс https://api.thecatapi.com/v1/images/search.
// Не забудь вказати в цьому запиті параметр рядка запиту breed_ids з ідентифікатором породи.
// Ось як буде виглядати URL-запит для отримання повної інформації про кота за ідентифікатором породи:
// https://api.thecatapi.com/v1/images/search?breed_ids=ідентифікатор_породи
// Напиши функцію fetchCatByBreed(breedId), яка очікує ідентифікатор породи, робить HTTP - запит і повертає проміс із даними про кота - результатом запиту.
// Винеси її у файл cat-api.js і зроби іменований експорт.
// Якщо запит був успішний, під селектом у блоці div.cat-info з'являється зображення і розгорнута інформація про кота: назва породи, опис і темперамент.

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    .then(([data]) => {
      console.log(data.breeds[0]);
      return {
        catImg: data.url,
        catName: data.breeds[0].name,
        catDescription: data.breeds[0].description,
        catTemperament: data.breeds[0].temperament,
      };
    });
}

export { fetchBreeds, fetchCatByBreed };
