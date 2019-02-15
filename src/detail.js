import './styles/detail.scss';
import api from './js/api';
import './js/commentForm';
import {
  renderComments
} from './js/commentForm';


import defaultImage from './images/default.png';

const isDetailPage = window.location.pathname.includes('detail');

if (isDetailPage) {
  const filterEl = document.querySelectorAll('.filter-container, .navbar-icon');

  filterEl.forEach(element => element.parentNode.removeChild(element));
}


const detailTemplate = ({
  name,
  description,
  image,
  beerId,
  ingredients,
  firstBrewed,
  brewersTips,
  price
}) => `
<header id="${beerId}">
<div class="title-section">
<h1><span>${beerId}</span>${name}</h1>
</div>
<div class="image-container">
<img src="${image ? image : defaultImage}" />
</div>
</header>
<div class="content">
<p>${description}</p>
     <div class="ingredients">
     <p>Ingredients:</p>
    <ul>
    <p>Malt</p>
    ${ displayIngredients(ingredients.malt)} 
    </ul>
    <ul>
    <p>Hops</p>
    ${ displayIngredients(ingredients.hops)} 
    </ul>
    <ul>
    <p>Yeast</p>
    <li>
    ${ingredients.yeast}    </li>
    </li>
    <ul>
    </div>
    <p> ${brewersTips}</p>

    <p class="smalltext">Date of first brewed: ${firstBrewed}</p>   
    <p class="smalltext">Price: <span class="price">${price} $<span> </p>   

</div>
`;
const {
  getbeerDetail
} = api();

const renderDetail = async () => {
  try {
    const [, id] = window.location.search ? window.location.search.split('=') : [];
    const beer = await getbeerDetail(id);
    const beerHTML = detailTemplate(beer);
    document.getElementById('detail').innerHTML = beerHTML;

    const {
      comment
    } = beer;
    renderComments(comment);

  } catch (e) {
    console.error(e);
  }

};

function displayIngredients(ingredient) {
  const displayText = ingredient.map(function (i) {
    return `<li>
        ${i.name} - ${i.amount.value} ${i.amount.unit}
        </li>
        `;
  });
  return displayText.join('');
}


renderDetail();