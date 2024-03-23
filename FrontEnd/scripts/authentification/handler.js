import { fetchLogin } from "../api-requests/api-requests.js";
import { checkErrorsLogin, hideErrors, handleErrors } from "../utils/errors.js";
import { showAlert } from "../utils/alerts.js";

// Handle login on login page

export function handleLoginOnLoginPage() {
    if (!window.location.href.includes('login.html')) {
        return
    }
    handleLogin();
}

// Handle login

function handleLogin() {
    const logInForm = document.querySelector(".login-form");
    logInForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;

        const errors = checkErrorsLogin(email, password);

        if (errors.length !== 0) {
            handleErrors(errors);

            document.addEventListener("click", () => {
                hideErrors();
            })

            return
        }

        try {
            const responseLogin = await fetchLogin(email, password);
            localStorage.setItem("accessToken", responseLogin.token);
            window.location.href = 'index.html';

        } catch {
            showAlert(
                "error",
                "Échec lors de la connexion",
                "La combinaison email / mot de passe est peut-être incorrecte. Veuillez réessayer.",
                false,
                "",
                false,
                "",
                true,
                6000
            );
        }
    })
}

// Handle logout

export function handleLogOut() {
    const headerNavLinkLogOut = document.querySelector("#header-nav-link-logout");
    if (!headerNavLinkLogOut) {
        return
    }
    headerNavLinkLogOut.addEventListener("click", () => {
        localStorage.removeItem("accessToken");
        location.reload();
    })
}