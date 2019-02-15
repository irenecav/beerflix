
import { renderDOMbeers } from './beers';

export const filterBeers = (beers = []) => {
  const firstBrewedEl = document.getElementById('firstBrewed');
  const firstBrewedVal = firstBrewedEl.value.split('-').reverse().join('/');

  console.log(firstBrewedVal);

  return firstBrewedVal ? beers.filter(beer => {
    return  beer.firstBrewed === firstBrewedVal;
  }): beers;
};

const firstBrewedEl = document.getElementById('firstBrewed');
const searchInput = document.querySelector('.input.search');

firstBrewedEl.addEventListener('change', (evt) => {
  console.log(evt);
  evt.preventDefault();
  if(searchInput.value !== ''){
    //traer beers !!!! de '.beers'
    renderDOMbeers(searchInput.value);
  } else {
    renderDOMbeers();
  }
});