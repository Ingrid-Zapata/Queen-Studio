// =======================
// MENÚ HAMBURGUESA
// =======================
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
}

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

console.log("Queen Studio Website Loaded ✅");

// =========================
// CARRUSEL AUTOMÁTICO DE SERVICIOS
// =========================
function crearCarrusel(idSlider, carpeta, total) {
  const slider = document.getElementById(idSlider);
  if (!slider) return;

  // Limpiar slider
  slider.innerHTML = '';

  // Crear imágenes dinámicamente
  for (let i = 1; i <= total; i++) {
    const img = document.createElement('img');
    img.src = `${carpeta}${i}.jpeg`;
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

// Crear los carruseles
crearCarrusel('slider-unas', 'imagenes/1. Uñas/', 38);
crearCarrusel('slider-pestanas', 'imagenes/6. Pestañas Cejas/', 27);
crearCarrusel('slider-disenocolor', 'imagenes/3. Mechas/', 20);
crearCarrusel('slider-alisado', 'imagenes/2. Alaciados/', 32);
crearCarrusel('slider-permanente', 'imagenes/4. Permanentes/', 6);
crearCarrusel('slider-maquillaje', 'imagenes/5. maquillaje y peinado/', 19);

// =========================
// FORMULARIO AGENDAR CITA
// =========================
const agendarForm = document.getElementById('agendarForm');
if (agendarForm) {
  // Inicializar EmailJS
  emailjs.init("pgPhVWz5l64nPdsWO");
  
  // Establecer fecha mínima (hoy)
  const fechaInput = document.getElementById('fecha');
  if (fechaInput) {
    const today = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('min', today);
  }

  agendarForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');

    // Deshabilitar botón
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // Obtener datos del formulario
    const formData = {
      id: Date.now(),
      nombre: document.getElementById('nombre').value,
      telefono: document.getElementById('telefono').value,
      servicio: document.getElementById('servicio').value,
      fecha: document.getElementById('fecha').value,
      hora: document.getElementById('hora').value,
      anticipo: document.getElementById('anticipo').checked ? 'Sí' : 'No',
      notas: document.getElementById('notas').value || 'Sin notas adicionales',
      estado: 'en espera',
      fechaCreacion: new Date().toISOString()
    };

    // Parámetros para el email (deben coincidir con tu template)
    const emailParams = {
      nombre: formData.nombre,
      telefono: formData.telefono,
      servicio: formData.servicio,
      fecha: formData.fecha,
      hora: formData.hora,
      anticipo: formData.anticipo,
      notas: formData.notas,
      to_email: 'queenstudioym@gmail.com' // Email destino de Queen Studio
    };

    // Enviar email usando EmailJS
    emailjs.send('service_inzora', 'template_correo', emailParams)
      .then(function(response) {
        console.log('Email enviado!', response.status, response.text);
        
        // Guardar en localStorage
        const citasGuardadas = localStorage.getItem('citas');
        const citas = citasGuardadas ? JSON.parse(citasGuardadas) : [];
        citas.push({...formData, anticipo: document.getElementById('anticipo').checked});
        localStorage.setItem('citas', JSON.stringify(citas));

        // Mostrar mensaje de éxito
        messageDiv.className = 'success-message';
        messageDiv.textContent = '✅ ¡Cita agendada y correo enviado! Te contactaremos pronto.';
        messageDiv.style.display = 'block';

        // Limpiar formulario
        agendarForm.reset();

        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.textContent = 'Agendar Cita';

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          messageDiv.style.display = 'none';
        }, 5000);
        
      }, function(error) {
        console.error('Error al enviar email:', error);
        
        // Aún así guardar en localStorage
        const citasGuardadas = localStorage.getItem('citas');
        const citas = citasGuardadas ? JSON.parse(citasGuardadas) : [];
        citas.push({...formData, anticipo: document.getElementById('anticipo').checked});
        localStorage.setItem('citas', JSON.stringify(citas));
        
        // Mostrar mensaje de advertencia
        messageDiv.className = 'error-message';
        messageDiv.textContent = '⚠️ Cita guardada pero no se pudo enviar el correo. Contacta por WhatsApp.';
        messageDiv.style.display = 'block';

        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.textContent = 'Agendar Cita';

        // Ocultar mensaje después de 7 segundos
        setTimeout(() => {
          messageDiv.style.display = 'none';
        }, 7000);
      });
  });
}


