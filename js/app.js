var menuItem =Document.querySelectorAll('.item-menu');
function selecLink(){
    menuItem.forEach((item) =>
    item.classList.remove('active')
)
this.classList.add('active');
}
menuItem.forEach((item) =>
item.addEventListener('click',selecLink)
)

// Menu Lateral Expandir/Retrair

const btnExpandir = document.querySelector('#btn-expandir');
const menuSidebar = document.querySelector('.menu-lateral');

btnExpandir.addEventListener('click', () => {
    menuSidebar.classList.toggle('expandir');
});
