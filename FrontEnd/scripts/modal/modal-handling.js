import { openModal } from "./modal-display.js";
import { showModalProjects } from "./modal-projects.js";
import { showProjectCreationForm } from "./modal-project-creation.js";

document.addEventListener("DOMContentLoaded", () => {
    const linkOpenModal = document.querySelector(".js-modal");
    linkOpenModal.addEventListener("click", openModal);

    showModalProjects();
    showProjectCreationForm();
})