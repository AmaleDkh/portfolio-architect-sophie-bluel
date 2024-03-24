import { addNewPhoto } from "../works/new-project-add-photo.js";
import { selectCategory } from "../works/new-project-select-category.js";
import { addNewProject } from "../works/new-project-creation.js";
import { buttonSubmitProject } from "../works/new-project-button-submit.js";

// Show project creation form

export function showProjectCreationForm() {
  const buttonAddPhoto = document.querySelector(".button-add-photo");

  buttonAddPhoto.addEventListener("click", () => {
    const modalTitle = document.querySelector(".modal-title");
    modalTitle.innerText = "Ajout photo";
    const modalGallery = document.querySelector(".modal-gallery-add-project");
    modalGallery.style.display = "none";

    const arrowLeft = document.querySelector(".fa-arrow-left");
    arrowLeft.style.display = null;
    const modalForm = document.querySelector(".modal-add-new-project");
    modalForm.style.display = null;

    backToModalGallery();
    addNewPhoto();
    addNewProject();
    buttonSubmitProject();

    const selectCategories = document.querySelectorAll(
      "#project-category option",
    );
    if (selectCategories.length !== 0) {
      return;
    }
    selectCategory();
  });
}

// Back to the gallery in modal

function backToModalGallery() {
  const arrowLeft = document.querySelector(".fa-arrow-left");

  arrowLeft.addEventListener("click", () => {
    const arrowLeft = document.querySelector(".fa-arrow-left");
    arrowLeft.style.display = "none";
    const modalTitle = document.querySelector(".modal-title");
    modalTitle.innerText = "Galerie photo";
    const modalForm = document.querySelector(".modal-add-new-project");
    modalForm.style.display = "none";

    const modalGallery = document.querySelector(".modal-gallery-add-project");
    modalGallery.style.display = null;
  });
}
