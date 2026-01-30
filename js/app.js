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

var btnExpandir = Document.querySelector('#btn-expandir')
var menuSidebar = Document.querySelector('.menu-lateral')

btnExpandir.addEventListener('click', function(){
    menuSidebar.classList.toggle('expandir')
})