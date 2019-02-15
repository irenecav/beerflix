import { renderDOMbeers } from './beers';

console.log('navbar');

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('.input.search');

searchForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(searchInput.value !== ''){
    //traer beers !!!! de '.beers'
    renderDOMbeers(searchInput.value);
  } else {
    renderDOMbeers();
  }
});



