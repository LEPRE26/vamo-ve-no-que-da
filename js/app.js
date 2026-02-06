// Selecionar todos os itens do menu
var menuItem = document.querySelectorAll('.item-menu');

// Função para selecionar o link ativo
function selectLink() {
    // Remove a classe 'active' de todos os itens
    menuItem.forEach((item) => {
        item.classList.remove('active');
    });
    
    // Adiciona a classe 'active' apenas ao item clicado
    this.classList.add('active');
}

// Adiciona evento de clique a cada item do menu
menuItem.forEach((item) => {
    item.addEventListener('click', selectLink);
});

// Menu Lateral Expandir/Retrair
const btnExpandir = document.querySelector('#btn-expandir');
const menuSidebar = document.querySelector('.menu-lateral');
const body = document.querySelector('body');

btnExpandir.addEventListener('click', () => {
    menuSidebar.classList.toggle('expandir');
    body.classList.toggle('expandir-body');
});

// Submenu Expandir/Retrair

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('configuracoes-toggle');
  const submenu = document.getElementById('configuracoes-submenu');

  if (toggle && submenu) {
    toggle.addEventListener('click', () => {
      submenu.classList.toggle('open');
    });
  }
});
