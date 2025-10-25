// =======================
// MENÚ HAMBURGUESA
// =======================
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

document.querySelectorAll("#menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

// =======================
// SLIDER AUTOMÁTICO
// =======================
document.querySelectorAll('.slider').forEach(slider => {
  let slides = slider.querySelectorAll('.slide');
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }, 3000);
});

// =======================
// BOTÓN "VER MÁS"
// =======================
document.querySelectorAll('.ver-mas').forEach(btn => {
  btn.addEventListener('click', () => {
    const info = btn.nextElementSibling;
    info.style.display = info.style.display === 'block' ? 'none' : 'block';
  });
});

// =======================
// BURBUJA WHATSAPP
// =======================
document.getElementById("whatsapp-float").addEventListener("click", function() {
  document.getElementById("whatsapp-popup").classList.toggle("active");
});

console.log("Queen Studio Website Loaded ✅");
