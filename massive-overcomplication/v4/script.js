function toggleMenu() {
    const menu = document.querySelector(".ham-menu-links");
    const icon = document.querySelector(".ham-icon");
    menu.classList.toggle("ham-open");
    icon.classList.toggle("ham-open");
}