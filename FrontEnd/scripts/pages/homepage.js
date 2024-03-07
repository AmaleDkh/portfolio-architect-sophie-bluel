import { showProjects } from "../gallery/gallery.js";
import { showFilters } from "../filters/filters.js";
import { handleToken } from "../token/token.js";
import { handleLogOut } from "../authentification/authentification-handler.js";
import { openModal } from "../modal/modal-display.js";
import { showModalProjects } from "../modal/modal-gallery.js";
import { showProjectCreationForm } from "../modal/project-creation-handler.js";

document.addEventListener('DOMContentLoaded', () => {
    loadGalleryAndFilters();

    const token = localStorage.getItem("accessToken");
    handleToken(token);

    handleLogOut();

    const linkOpenModal = document.querySelector(".js-modal");
    linkOpenModal.addEventListener("click", openModal);

    showModalProjects();

    showProjectCreationForm();
})

async function loadGalleryAndFilters() {
    const listProjects = await fetchWorks();
    showProjects(listProjects);
    showFilters(listProjects);
}

async function fetchWorks() {
    const url = 'http://localhost:5678/api/works';
    const response = await fetch(url).then(response => response.json());
    localStorage.setItem("stockedResponse", JSON.stringify(response));
    return response;
}