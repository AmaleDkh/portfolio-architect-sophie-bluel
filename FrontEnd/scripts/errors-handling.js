// Errors hiding 

export function hideErrors() {
    const divError = document.querySelectorAll(".error");
    divError.forEach((div) => {
        if (div) {
            div.style.display = "none";
        }
    })
}
