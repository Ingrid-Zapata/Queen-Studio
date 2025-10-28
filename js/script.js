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
document.querySelectorAll(".ver-mas").forEach(btn => {
  btn.addEventListener("click", function() {
    const card = this.closest(".card");
    card.classList.toggle("active");
    this.textContent = card.classList.contains("active") ? "Ver menos" : "Ver más";
  });
});


// =======================
// BURBUJA WHATSAPP
// =======================
document.getElementById("whatsapp-float").addEventListener("click", function() {
  document.getElementById("whatsapp-popup").classList.toggle("active");
});

console.log("Queen Studio Website Loaded ✅");

// =========================
// CARRUSEL AUTOMÁTICO DE UÑAS
// =========================

// Seleccionamos el contenedor del slider
const sliderContainer = document.getElementById('slider-unas');

// Ruta de las imágenes
const folder = 'imagenes/Uñas/';
const totalImages = 15; // total de imágenes que tengas

// Crear imágenes dinámicamente
for (let i = 1; i <= totalImages; i++) {
  const img = document.createElement('img');
  img.src = `${folder}${i}.jpg`;
  img.classList.add('slide');
  img.alt = `Diseño de uñas ${i}`;
  img.onerror = () => img.remove(); // elimina si no existe
  sliderContainer.appendChild(img);
}

// Una vez que las imágenes estén listas, activamos el carrusel
window.addEventListener('load', () => {
  const slides = document.querySelectorAll('#slider-unas .slide');
  let current = 0;

  // Activamos la primera imagen
  if (slides.length > 0) slides[0].classList.add('active');

  // Cambiamos cada 3 segundos
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 3000);
});
