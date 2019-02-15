const navbar = document.getElementById('navbar');
const navbarLogo = document.querySelector('.navbar-logo');
const searchIcon = document.getElementById('navbar-search');
const closeIcon = document.getElementById('navbar-close');

//funcion que retorna otra función
const toggle = elemento => (removeClass, addClass) => {
  elemento.classList.remove(removeClass);
  elemento.classList.add(addClass);
};

const navbarVariables = toggle(navbar);


searchIcon.addEventListener('click', ()=> 
  navbarVariables('no-search', 'search'));

closeIcon.addEventListener('click', ()=>
  navbarVariables('search', 'no-search'));


const openHeader = (id) => (event) => {
  console.log(event);
  const elemento = document.getElementById(id);
  elemento.classList.toggle('close');
};    
   

export {
  openHeader
};