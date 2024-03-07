import { checkErrorsLogin } from "../utils/utils.js";
import { hideErrors } from "../utils/utils.js";
import { handleErrors } from "../utils/utils.js";

// Handle login on login page

export function handleLoginOnLoginPage() {
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

        const errors = checkErrorsLogin(email, password);

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

export function handleLogOut() {
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

// Show message when username and password doesn't match

function showLoginError() {
    const divErrorLogin = document.getElementById("login-form-error");
    divErrorLogin.style.display = null;
    divErrorLogin.innerText = "La combinaison utilisateur / mot de passe est peut-être incorrecte. \nVeuillez réessayer.";
}