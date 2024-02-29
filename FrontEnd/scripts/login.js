document.addEventListener('DOMContentLoaded', () => {
    handLoginOnLoginPage();
    logOut();
})

function handLoginOnLoginPage() {
    if (window.location.href.includes('login.html')) {
        handleLogin();
    }
}

function handleLogin() {
    const logInForm = document.querySelector(".login-form");

    logInForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.querySelector('input[name="email"]').value;

        const password = document.querySelector('input[name="password"]').value;

        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("La requête a échoué avec le status " + response.status);
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem("accessToken", data.token);
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error(error);
                alert("La combinaison utilisateur / mot de passe est incorrect. Veuillez réessayer.");
            })
    })
}

function logOut() {
    const headerNavLinkLogOut = document.querySelector(".header-nav-link-logout");
    if (headerNavLinkLogOut) {
        headerNavLinkLogOut.addEventListener("click", () => {
            localStorage.removeItem("accessToken");
            location.reload();
        })
    }
}

