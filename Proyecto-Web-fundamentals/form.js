document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("demoForm");
  const nameInput = document.getElementById("name");
  const nicknameInput = document.getElementById("nickname");
  const biographyInput = document.getElementById("biography");
  const passwordInput = document.getElementById("password");
  const submitBtn = document.getElementById("submitBtn");
  const serverResponse = document.getElementById("serverResponse");

  // Recuperar datos del localStorage
  if (localStorage.getItem("name"))
    nameInput.value = localStorage.getItem("name");
  if (localStorage.getItem("nickname"))
    nicknameInput.value = localStorage.getItem("nickname");
  if (localStorage.getItem("biography"))
    biographyInput.value = localStorage.getItem("biography");

  // Validación en tiempo real
  nameInput.addEventListener("input", validateForm);
  nicknameInput.addEventListener("input", validateForm);
  biographyInput.addEventListener("input", validateForm);
  passwordInput.addEventListener("input", validateForm);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validar campos antes de enviar
    const isValid = validateForm();

    if (isValid) {
      // Simular envío al servidor
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      delete data.password; // No enviar la contraseña en el payload

      fetch("https://mocktarget.apigee.net/echo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          serverResponse.innerHTML = `<pre>${JSON.stringify(
            data,
            null,
            2
          )}</pre>`;
          serverResponse.classList.remove("hidden");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });

  function validateForm() {
    let isValid = true;

    // Validar Nombre
    if (nameInput.value.trim() === "") {
      showError("nameError", "El nombre es obligatorio.");
      isValid = false;
    } else {
      hideError("nameError");
      localStorage.setItem("name", nameInput.value);
    }

    // Validar Apodo
    const nicknameRegex = /^[a-zA-Z0-9]{3,10}$/;
    if (!nicknameRegex.test(nicknameInput.value.trim())) {
      showError(
        "nicknameError",
        "El apodo debe tener entre 3 y 10 caracteres alfanuméricos."
      );
      isValid = false;
    } else {
      hideError("nicknameError");
      localStorage.setItem("nickname", nicknameInput.value);
    }

    // Validar Biografía
    if (
      biographyInput.value.trim() !== "" &&
      biographyInput.value.trim().length < 100
    ) {
      showError(
        "biographyError",
        "La biografía debe tener al menos 100 caracteres."
      );
      isValid = false;
    } else {
      hideError("biographyError");
      localStorage.setItem("biography", biographyInput.value);
    }

    // Validar Contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(passwordInput.value.trim())) {
      showError(
        "passwordError",
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número."
      );
      isValid = false;
    } else {
      hideError("passwordError");
    }

    // Habilitar o deshabilitar el botón de enviar
    submitBtn.disabled = !isValid;

    return isValid;
  }

  function showError(elementId, errorMessage) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = errorMessage;
    errorElement.style.display = "block";
  }

  function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
});
