// Check potential errors on input login

export function checkErrorsLogin(email, password) {
    const errors = [];

    if (email === '') {
        errors.push({ text: "e-mail", id: "login-form-error-1" });
    }

    if (password === '') {
        errors.push({ text: "mot de passe", id: "login-form-error-2" });
    }

    return errors;
}

// Show message when username and password doesn't match

export function showLoginError() {
    const divErrorLogin = document.getElementById("login-form-error");
    divErrorLogin.style.display = null;
    divErrorLogin.innerText = "La combinaison utilisateur / mot de passe est peut-être incorrecte. \nVeuillez réessayer.";
}

// Check potential errors on input new project

export function checkErrorsNewProject(photo, title, category) {
    const errors = [];

    if (title === '') {
        errors.push({ text: "titre", id: "modal-form-error-1" });
    }

    if (category === '0') {
        errors.push({ text: "catégorie", id: "modal-form-error-2" });
    }

    if (!photo && !document.querySelector(".new-photo").src) {
        errors.push({ text: "photo", id: "modal-form-error-3" });
    }

    return errors;
}

// Hide errors

export function hideErrors() {
    const allDivError = document.querySelectorAll(".error");

    allDivError.forEach((divError) => {
        if (!divError) {
            return
        }
        divError.style.display = "none";
    })
}

// Handle errors 

export function handleErrors(errors) {
    errors.forEach((error) => {
        const divError = document.getElementById(error.id);
        divError.style.display = null;
        divError.innerText = "L'information " + error.text + " est manquante";
    })
}