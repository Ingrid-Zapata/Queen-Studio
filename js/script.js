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
function crearCarrusel(idSlider, carpeta, total) {
  const slider = document.getElementById(idSlider);
  if (!slider) return;

  // Crear imágenes dinámicamente
  for (let i = 1; i <= total; i++) {
    const img = document.createElement('img');
    img.src = `${carpeta}${i}.jpg`;
    img.classList.add('slide');
    img.alt = `Imagen ${i}`;
    img.onerror = () => img.remove(); // elimina si no existe
    slider.appendChild(img);
  }

  // Iniciar el carrusel cuando se carguen las imágenes
  window.addEventListener('load', () => {
    const slides = slider.querySelectorAll('.slide');
    if (slides.length === 0) return;
    let current = 0;

    slides[0].classList.add('active');
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 3000);
  });
}

// Crear los dos carruseles
crearCarrusel('slider-unas', 'imagenes/1. Uñas/', 38);
crearCarrusel('slider-pestanas', 'imagenes/6. Pestañas Cejas/', 27);
crearCarrusel('slider-disenocolor', 'imagenes/3. Mechas/', 27);
crearCarrusel('slider-alisado', 'imagenes/2. Alaciados/', 32);
crearCarrusel('slider-permanente', 'imagenes/4. Permanentes/', 6);
crearCarrusel('slider-maquillaje', 'imagenes/5. maquillaje y peinado/', 19);
