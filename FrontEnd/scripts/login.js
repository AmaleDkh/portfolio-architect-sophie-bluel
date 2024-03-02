import { hideErrors } from "./errors-handling.js"

document.addEventListener('DOMContentLoaded', () => {
    handLoginOnLoginPage();
    logOut();
})

function handLoginOnLoginPage() {
    if (window.location.href.includes('login.html')) {
        handleLogin();
    }
}

// Login 

function handleLogin() {
    const logInForm = document.querySelector(".login-form");

    logInForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;

        const errors = [];
        if (email === '') {
            errors.push({ text: "e-mail", id: "login-form-error-1" });
        }
        if (password === '') {
            errors.push({ text: "mot de passe", id: "login-form-error-2" });
        }

        try {
            if (errors.length === 0) {
                const response = await fetch('http://localhost:5678/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                })

                const data = response.json();

                if (response.status !== 200) {
                    throw new Error;
                }

                localStorage.setItem("accessToken", data.token);
                window.location.href = 'index.html';
            } else {
                errors.forEach((error) => {
                    const divError = document.getElementById(error.id);
                    divError.style.display = null;
                    divError.innerText = "L'information " + error.text + " est manquante";
                })
            }
        } catch {
            const divErrorLogin = document.getElementById("login-form-error");
            divErrorLogin.style.display = null;
            divErrorLogin.innerText = "La combinaison utilisateur / mot de passe est peut-être incorrecte. \nVeuillez réessayer.";
        }
        document.addEventListener("click", () => {
            hideErrors();
        })
    })
}

// Logout

function logOut() {
    const headerNavLinkLogOut = document.querySelector(".header-nav-link-logout");
    if (headerNavLinkLogOut) {
        headerNavLinkLogOut.addEventListener("click", () => {
            localStorage.removeItem("accessToken");
            location.reload();
        })
    }
}

