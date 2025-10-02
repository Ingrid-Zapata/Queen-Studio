// Animación suave al hacer clic en enlaces del menú
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// Mensaje en consola (puedes usarlo para pruebas)
console.log("Quen Studio Website Loaded ✅");
