// Check potential errors on input login

export function checkErrorsLogin(email, password) {
  const errors = [];

  if (email === "") {
    errors.push({ text: "e-mail", id: "login-form-error-1" });
  }

  if (password === "") {
    errors.push({ text: "mot de passe", id: "login-form-error-2" });
  }

  return errors;
}

// Check potential errors on input new project

export function checkErrorsNewProject(photo, title, category) {
  const errors = [];

  if (title === "") {
    errors.push({ text: "titre", id: "modal-form-error-1" });
  }

  if (category === "0") {
    errors.push({ text: "catégorie", id: "modal-form-error-2" });
  }

  if (!photo && !document.querySelector(".new-photo").src) {
    errors.push({ text: "photo", id: "modal-form-error-3" });
  }

  return errors;
}

// Handle errors

export function handleErrors(errors) {
  errors.forEach((error) => {
    const divError = document.getElementById(error.id);
    divError.style.display = null;
    divError.innerText = "L'information " + error.text + " est manquante";
  });
}

// Hide errors

export function hideErrors() {
  const allDivErrors = document.querySelectorAll(".error");

  allDivErrors.forEach((divError) => {
    if (!divError) {
      return;
    }
    divError.style.display = "none";
  });
}
