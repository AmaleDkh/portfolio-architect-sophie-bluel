import { showProjects } from "./homepage/homepage-projects.js";
import { showFilters } from "./homepage/homepage-projects-filtered.js";

init();

async function init() {
    const listProjects = await fetchWorks();
    showProjects(listProjects);
    showFilters(listProjects);
}

async function fetchWorks() {
    const url = 'http://localhost:5678/api/works';
    const response = await fetch(url).then(response => response.json());
    return response;
}

// Token verification for user functionalities

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        const editionMode = document.querySelector(".edition-mode");
        editionMode.style.display = null;
        const modificationLink = document.querySelector(".js-modal");
        modificationLink.style.display = null;
        
        const headerNavLinkLogin = document.querySelector(".header-nav-link-login");
        headerNavLinkLogin.style.display = "none";
        const headerNavLinkLogout = document.querySelector(".header-nav-link-logout");
        headerNavLinkLogout.style.display = null;
    }
})