function toggleMenu() {
  const menu = document.querySelector('.navLeft');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

window.addEventListener('resize', function () {
  if (window.innerWidth > 768) {
    document.getElementById('menu-checkbox').checked = false;
  }
});