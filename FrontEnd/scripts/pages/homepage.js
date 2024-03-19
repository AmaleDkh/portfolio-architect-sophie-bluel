import { fetchProjects } from "../api-requests/api-requests.js";
import { showProjects } from "../gallery/gallery.js";
import { showFilters } from "../filters/filters.js";
import { handleToken } from "../token/token.js";
import { handleLogOut } from "../authentification/authentification-handler.js";
import { openModal } from "../modal/modal-display.js";
import { showModalProjects } from "../modal/modal-gallery.js";
import { showProjectCreationForm } from "../modal/project-creation-handler.js";

document.addEventListener('DOMContentLoaded', async () => {
    const listProjects = await fetchProjects();

    showProjects(listProjects);

    showFilters(listProjects);

    const token = localStorage.getItem("accessToken");
    handleToken(token);

    handleLogOut();

    const linkOpenModal = document.querySelector(".js-modal");
    linkOpenModal.addEventListener("click", openModal);

    showModalProjects();

    showProjectCreationForm();
})