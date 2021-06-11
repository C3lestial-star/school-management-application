const menu = document.getElementById("wrapper");

const button = document.getElementById("menu-toggle");

button.onclick = function () {
  menu.classList.toggle("toggled");
};
