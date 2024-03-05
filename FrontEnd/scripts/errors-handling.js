// Hide errors

export function hideErrors() {
    const divError = document.querySelectorAll(".error");
    divError.forEach((div) => {
        if (div) {
            div.style.display = "none";
        }
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