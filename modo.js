document.addEventListener("DOMContentLoaded", function() {
    const btnModo = document.getElementById("modo-btn");
    const body = document.body;
  
    // Comprobar si el usuario ya tiene una preferencia guardada
    if (localStorage.getItem("modo") === "oscuro") {
      body.classList.add("dark-mode");
      btnModo.textContent = "☀️ Modo Claro";
    }
  
    btnModo.addEventListener("click", function() {
      body.classList.toggle("dark-mode");
  
      // Guardar la preferencia del usuario
      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("modo", "oscuro");
        btnModo.textContent = "☀️ Modo Claro";
      } else {
        localStorage.setItem("modo", "claro");
        btnModo.textContent = "🌙 Modo Oscuro";
      }
    });
  });
  