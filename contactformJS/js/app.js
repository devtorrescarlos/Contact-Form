document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const name = document.getElementById("nombre");
  const lastName = document.getElementById("apellido");
  const email = document.getElementById("email");
  const message = document.getElementById("mensaje");
  const form = document.getElementById("formulario");
  const btnSubmit = document.getElementById("submit");
  const check = document.getElementById("check");
  const query = document.querySelector("#query");
  const toast = document.querySelector("#toast");

  const data = {
    nombre: "",
    apellido: "",
    email: "",
    mensaje: "",
  };

  // Change Radio Background Color
  const changeRadioBg = () => {
    const radio = query.querySelectorAll("input");

    radio.forEach((button) => {
      if (button.checked) {
        button.parentNode.classList.add("radio-selected");
      } else {
        button.parentNode.classList.remove("radio-selected");
      }
    });
  };
  query.querySelectorAll("input").forEach((button) => {
    button.addEventListener("click", changeRadioBg);
  });
  // Event Listeners
  name.addEventListener("blur", validateForm);
  lastName.addEventListener("blur", validateForm);
  email.addEventListener("blur", validateForm);
  message.addEventListener("input", validateForm);
  check.addEventListener("change", validateForm);
  query.addEventListener("change", validateForm);
  form.addEventListener("submit", sendForm);

  function validateForm(e) {
    // Check if is empty
    if (e.target.value.trim() === "") {
      setError("This field is required", e.target.parentNode);

      // Change background color if isn't valid
      changeBg(e);
      data[e.target.id] = "";
      checkForm();
      return;
    }

    // Validate Email

    if (e.target.id === "email" && !emailValidation(e.target.value)) {
      setError("Please enter a valid email address", e.target.parentNode);
      changeBg(e);
      data[e.target.id] = "";
      checkForm();
      return;
    }

    // Turn back to original background color if is valid

    if (e.target.classList.contains("error-bg")) {
      e.target.classList.remove("error-bg");
      e.target.classList.add("contenido__input");
    }

    cleanAlert(e.target.parentNode);

    // Asign values
    data[e.target.id] = e.target.value.trim().toLowerCase();
    checkForm();
  }

  function setError(msg, ref) {
    // Check if an alert exist
    cleanAlert(ref);

    const alert = document.createElement("P");
    alert.textContent = msg;
    alert.classList.add("error");
    ref.appendChild(alert);
  }

  function cleanAlert(ref) {
    const alert = ref.querySelector(".error");
    if (alert) {
      alert.remove();
    }
  }

  function sendForm(e) {
    e.preventDefault();

    setTimeout(() => {
      toast.classList.remove("hidden");

    resetForm();

      setTimeout(() => {
        toast.classList.add("hidden");
      }, 3000);
    }, 10);
  }

  function emailValidation(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regex.test(email);
    return result;
  }

  function changeBg(e) {
    if (e.target.classList.contains("contenido__input")) {
      e.target.classList.remove("contenido__input");
      e.target.classList.add("error-bg");
    }
  }

  // Asign values to the object and check if it is complete
  function checkForm() {
    const emailCompleted = Object.values(data).every((value) => value !== "");
    const checkboxCompleted = check.checked;
    const radioSelected =
      query.querySelector('input[type="radio"]:checked') !== null;

    if (emailCompleted && checkboxCompleted && radioSelected) {
      btnSubmit.classList.remove("opacity");
      btnSubmit.disabled = false;
    } else {
      btnSubmit.classList.add("opacity");
      btnSubmit.disabled = true;
    }
  }

  // Reset form values
  function resetForm() {
    
    data.nombre = "";
    data.apellido = "";
    data.email = "";
    data.mensaje = "";

    form.reset();

    checkForm();
  }
});
