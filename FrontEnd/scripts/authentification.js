import { hideErrors } from "./errors-handling.js";
import { handleErrors } from "./errors-handling.js";

document.addEventListener('DOMContentLoaded', () => {
    handleLoginOnLoginPage();
    handlelogOut();
})

// Handle login on login page

function handleLoginOnLoginPage() {
    if (window.location.href.includes('login.html')) {
        handleLogin();
    }
}

// Handle login

function handleLogin() {
    const logInForm = document.querySelector(".login-form");
    logInForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;

        const errors = checkErrors(email, password);

        try {
            if (errors.length === 0) {
                const responseData = await submitLogin(email, password);
                localStorage.setItem("accessToken", responseData.token);
                window.location.href = 'index.html';
            } else {
                handleErrors(errors);
            }
        } catch {
            showLoginError();
        }
        document.addEventListener("click", () => {
            hideErrors();
        })
    })
}

// Handle logout

function handlelogOut() {
    const headerNavLinkLogOut = document.querySelector(".header-nav-link-logout");
    if (headerNavLinkLogOut) {
        headerNavLinkLogOut.addEventListener("click", () => {
            localStorage.removeItem("accessToken");
            location.reload();
        })
    }
}

// Handle submit login form

async function submitLogin(email, password) {
    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (response.status !== 200) {
        throw new Error;
    }

    return response.json();
}

// Check potential errors on input

function checkErrors(email, password) {
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

function showLoginError() {
    const divErrorLogin = document.getElementById("login-form-error");
    divErrorLogin.style.display = null;
    divErrorLogin.innerText = "La combinaison utilisateur / mot de passe est peut-être incorrecte. \nVeuillez réessayer.";
}