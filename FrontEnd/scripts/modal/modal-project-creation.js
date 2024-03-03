import { addNewPhoto } from './new-project-add-photo.js';
import { choiceCategory } from './new-project-select-category.js';
import { addNewProject } from './new-project-creation.js';

// Project creation form

export function showProjectCreationForm() {
    const firstModal = document.querySelector(".button-add-photo");
    firstModal.addEventListener("click", () => {
        const titleModal = document.querySelector(".modal-title");
        titleModal.innerText = "Ajout photo";
        const modalGallery = document.querySelector(".modal-gallery-add-project");
        modalGallery.style.display = "none";

        const arrowLeft = document.querySelector(".fa-arrow-left");
        arrowLeft.style.display = null;
        const formInModal = document.querySelector(".modal-add-new-project");
        formInModal.style.display = null;

        backToGalleryModal();
        addNewPhoto();
        addNewProject();

        const selectCategories = document.querySelectorAll("#project-category option");
        if (selectCategories.length === 0) {
            choiceCategory();
        }
    })
}

// Back to the gallery in modal

function backToGalleryModal() {
    const arrowLeft = document.querySelector(".fa-arrow-left");
    arrowLeft.addEventListener("click", () => {
        const arrowLeft = document.querySelector(".fa-arrow-left");
        arrowLeft.style.display = "none";
        const titleModal = document.querySelector(".modal-title");
        titleModal.innerText = "Galerie photo";
        const formInModal = document.querySelector(".modal-add-new-project");
        formInModal.style.display = "none";

        const modalGallery = document.querySelector(".modal-gallery-add-project");
        modalGallery.style.display = null;
    })
}