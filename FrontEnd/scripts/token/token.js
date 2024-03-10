export function handleToken(token) {
    if (!token) {
        return
    }

    const editionMode = document.querySelector(".edition-mode");
    editionMode.style.display = null;
    const modificationLink = document.querySelector(".js-modal");
    modificationLink.style.display = null;

    const headerNavLinkLogin = document.querySelector("#header-nav-link-login");
    headerNavLinkLogin.style.display = "none";
    const headerNavLinkLogout = document.querySelector("#header-nav-link-logout");
    headerNavLinkLogout.style.display = null;
}