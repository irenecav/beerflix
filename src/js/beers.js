import striptags from 'striptags';
import {
  openHeader
} from './ui';
import api from './api';
import defaultImg from './../images/default.png';
import { filterBeers } from './filter';

const {
  getbeers
} = api();

const templatebeer = ({
  name,
  image,
  description,
  principal,
  beerId,
  price,
  firstBrewed
}) => `
<div id="${beerId}" class="card ${principal ? 'principal' : 'secondary close'}">
<header class="card-header">
  <h2><span>${beerId}</span>${name}</h2>
</header>
<div class="card-content">
  <div class="card-content-image">
  <img src="${image ? image : defaultImg}" />
  </div>
  <div class="card-content-text">
    <p>${striptags(description)}
    </p>
    
    <div class="rating-container">
    <p class="smalltext">${firstBrewed}</p>   

    <p class="smalltext">Price:  <span class="price"> ${price} $<span> </p>       </div>
  </div>
</div>
</div>
`;

const renderbeers = (element, beers) => {
  const htmlbeers = beers.slice(0, 10).map((beer, index) => {
    if (index < 2) {
      return templatebeer({
        ...beer,
        principal: true
      });
    }

    return templatebeer({
      ...beer,
      principal: false
    });
  }).join('');
  element.innerHTML = htmlbeers;

  const headers = document.querySelectorAll('.card.secondary .card-header');

  headers.forEach((header) => {
    const id = header.parentNode.getAttribute('id');
    header.addEventListener('click', openHeader(id));
  });

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.addEventListener('click', (evt) => 
    location.href=`detail.html?id=${card.id}`));

};

export const renderDOMbeers = async (query) => {
  try {
    const fecthbeers = await getbeers(query);
    const beersection = document.getElementById('beer-section');
    
    const beerList = filterBeers(fecthbeers);
    renderbeers(beersection, beerList);
  } catch (e) {
    console.error(e);
  }
};







//hops: [{name: "Centennial", amount: {value: 5, unit: "grams"}, add: "start", attribute: "bitter"},…]

//Extra Pale - Maris Otter 3.44 kilograms


renderDOMbeers();