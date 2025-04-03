document.addEventListener("DOMContentLoaded", function() {
  // === MODO OSCURO/CLARO ===
  const btnModo = document.getElementById("modo-btn");
  const body = document.body;
  
  // Comprobar la preferencia guardada en localStorage
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
  
  // === VALIDACIONES, INDICADOR DE CONTRASEÑA Y FUNCIONALIDADES DEL FORMULARIO (solo para página de registro) ===
  if (document.body.classList.contains("pagina-registro")) {
    // Función para evaluar la fortaleza de la contraseña
    function evaluarSeguridad(password) {
      const strengthBar = document.getElementById("strength-bar");
      const strengthText = document.getElementById("strength-text");
  
      if (!password) {
        strengthBar.className = "";
        strengthText.textContent = "Seguridad: ";
        return;
      }
  
      let score = 0;
      if (password.length >= 6) score++;
      if (password.length >= 8) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[a-z]/.test(password)) score++;
      if (/\d/.test(password)) score++;
      if (/[\W_]/.test(password)) score++;
  
      if (score <= 2) {
        strengthBar.className = "weak";
        strengthText.textContent = "Seguridad: Débil";
      } else if (score <= 4) {
        strengthBar.className = "medium";
        strengthText.textContent = "Seguridad: Media";
      } else {
        strengthBar.className = "strong";
        strengthText.textContent = "Seguridad: Fuerte";
      }
    }
  
    // Actualizar el indicador de fortaleza en tiempo real
    const passwordInput = document.getElementById("password");
    passwordInput.addEventListener("input", function() {
      evaluarSeguridad(this.value);
    });
  
    // Validar que las contraseñas coincidan al enviar el formulario
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
      const pass = document.getElementById("password");
      const confirmPass = document.getElementById("confirmar");
      if (pass.value !== confirmPass.value) {
        alert("Las contraseñas no coinciden.");
        event.preventDefault();
      }
    });
  
    // Capitalizar nombre y apellido al perder el foco
    function capitalizeFirstLetter(input) {
      input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
    }
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellido");
    if (nombreInput) {
      nombreInput.addEventListener("blur", function() {
        capitalizeFirstLetter(this);
      });
    }
    if (apellidoInput) {
      apellidoInput.addEventListener("blur", function() {
        capitalizeFirstLetter(this);
      });
    }
  
    // === VALIDAR DNI: Convertir a mayúsculas y validar formato y letra ===
    function validarDNI(input) {
      var dni = input.value.toUpperCase();
      input.value = dni; // Forzar que el valor sea mayúsculas
      var pattern = /^[0-9]{8}[A-Z]$/;
      if (!pattern.test(dni)) {
        input.setCustomValidity("El DNI debe tener 8 dígitos seguidos de una letra. Ejemplo: 12345678Z.");
        return;
      }
      var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
      var numero = dni.slice(0, 8);
      var letra = dni.charAt(8);
      var letraCalculada = letras.charAt(parseInt(numero, 10) % 23);
      if (letra !== letraCalculada) {
        input.setCustomValidity("La letra del DNI no es correcta. Debería ser " + letraCalculada + ".");
      } else {
        input.setCustomValidity("");
      }
    }
    const dniInput = document.getElementById("dni");
    if (dniInput) {
      dniInput.addEventListener("blur", function() {
        validarDNI(this);
      });
    }
  
    // === BOTÓN PARA MOSTRAR/OCULTAR CONTRASEÑAS ===
    const togglePasswordBtn = document.getElementById("toggle-password");
    if (togglePasswordBtn) {
      togglePasswordBtn.addEventListener("click", function() {
        const passwordField = document.getElementById("password");
        const confirmField = document.getElementById("confirmar");
        if (passwordField.type === "password") {
          passwordField.type = "text";
          confirmField.type = "text";
          togglePasswordBtn.textContent = "Ocultar Contraseña";
        } else {
          passwordField.type = "password";
          confirmField.type = "password";
          togglePasswordBtn.textContent = "Mostrar Contraseña";
        }
      });
    }
  
    // === BOTÓN PARA LIMPIAR TODOS LOS CAMPOS DEL FORMULARIO ===
    const clearFormBtn = document.getElementById("clear-form");
    if (clearFormBtn) {
      clearFormBtn.addEventListener("click", function() {
        form.reset();
        // Reiniciar el indicador de fortaleza de contraseña
        const strengthBar = document.getElementById("strength-bar");
        const strengthText = document.getElementById("strength-text");
        if (strengthBar && strengthText) {
          strengthBar.className = "";
          strengthText.textContent = "Seguridad: ";
        }
      });
    }
  }
});
