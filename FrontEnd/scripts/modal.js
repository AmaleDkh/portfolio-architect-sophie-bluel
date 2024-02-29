// Modal opening and closing

document.addEventListener("DOMContentLoaded", () => {
    const linkOpenModal = document.querySelector(".js-modal");
    linkOpenModal.addEventListener("click", openModal);

    showProject();
    showSecondModal();
})

let modal = null;
const focusableSelector = 'a, button, input, textarea';
let focusableElements = [];
let previouslyFocusedElement = null;

const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    focusableElements = Array.from(modal.querySelectorAll(focusableSelector));
    previouslyFocusedElement = document.querySelector(':focus');
    modal.style.display = null;
    focusableElements[0].focus();
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop-propagation").addEventListener("click", stopPropagation);
}

const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
    e.preventDefault();
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop-propagation").removeEventListener("click", stopPropagation);
    const hideModal = function () {
        modal.style.display = "none";
        modal.removeEventListener("animationend", hideModal);
        modal = null;
    }
    modal.addEventListener("animationend", hideModal);
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

const focusInModal = function (e) {
    e.preventDefault();
    let index = focusableElements.findIndex(f => f === modal.querySelector(':focus'));
    if (e.shiftKey === true) {
        index--
    } else {
        index++;
    }
    if (index >= focusableElements.length) {
        index = 0;
    }
    if (index < 0) {
        index = focusableElements.length - 1;
    }
    focusableElements[index].focus();
}

window.addEventListener("keydown", function (e) {
    e.preventDefault();
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e);
    }
})

// Projects presented in modal

async function showProject() {
    const url = 'http://localhost:5678/api/works';
    const response = await fetch(url).then(response => response.json());

    for (let i = 0; i < response.length; i++) {
        const projectImageUrl = response[i].imageUrl;

        const imageProject = document.createElement("img");
        imageProject.src = projectImageUrl;

        const iconDeleteProject = document.createElement("i");
        iconDeleteProject.setAttribute("class", "fa-solid fa-trash-can");

        iconDeleteProject.addEventListener("click", (e) => {
            e.preventDefault();
            deleteProject(response[i].id);
        })

        const projectInModal = document.createElement("div");
        projectInModal.setAttribute("class", "project-in-modal");
        projectInModal.setAttribute("id", response[i].id);
        projectInModal.append(imageProject);
        projectInModal.append(iconDeleteProject)

        const divShowProjectModal = document.querySelector(".modal-gallery");
        divShowProjectModal.append(projectInModal);
    }
}

// Second content in modal

function showSecondModal() {
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

        const selectCategories = document.querySelectorAll("#project-category option")
        if (selectCategories.length === 0) {
            choiceCategory();
        }
    })
}

// Projects deleting

function deleteProject(id) {
    const token = localStorage.getItem("accessToken");

    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(() => {
            const projectInPortfolio = document.getElementById(`${id}`);
            if (projectInPortfolio) {
                projectInPortfolio.remove();
                alert("Suppression du projet réussie");
            } else {
                alert("Erreur lors de suppression du projet");
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

// Get API categories for select options

async function choiceCategory() {
    const url = "http://localhost:5678/api/categories";
    const categoriesData = await fetch(url).then(response => response.json());

    const inputSelectCategory = document.querySelector("#project-category");

    const firstCategory = document.createElement("option");
    firstCategory.innerText = "Sélectionnez une catégorie";
    inputSelectCategory.append(firstCategory);

    for (let i = 0; i < categoriesData.length; i++) {
        const categoryDataName = categoriesData[i].name;
        const optionCategory = document.createElement("option");
        optionCategory.setAttribute("id", categoriesData[i].id);
        optionCategory.append(categoryDataName);
        inputSelectCategory.append(optionCategory);
    }
}

// New photo adding

function addNewPhoto() {
    const titleAddPhoto = document.querySelector(".button-add-new-photo");
    titleAddPhoto.addEventListener("change", (e) => {
        const newPhotoSelected = e.target.files[0];
        const readerPhoto = new FileReader();

        readerPhoto.addEventListener("load", (e) => {
            const newPhotoLoaded = e.target.result;

            const newPhoto = document.querySelector(".new-photo");
            newPhoto.src = newPhotoLoaded;
            newPhoto.style.display = null;

            const iconPhoto = document.querySelector(".fa-image");
            iconPhoto.style.display = "none";
            const secondModalAddPhoto = document.querySelector(".button-add-new-photo");
            secondModalAddPhoto.style.display = "none";
            const specsPhoto = document.querySelector(".specs-photo");
            specsPhoto.style.display = "none";
        })
        if (newPhotoSelected) {
            readerPhoto.readAsDataURL(newPhotoSelected);
        }
    })
}

function addNewProject() {
    const submitForm = document.querySelector(".modal-form");
    submitForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const titleNewProject = document.querySelector("#project-title").value;
        const categoryNewProject = document.querySelectorAll("#project-category option:checked")[0].id;
        const photoNewProject = document.querySelector(".input-add-new-photo").files[0];

        const array = []
        if (titleNewProject === '') {
            array.push('titre')
        }
        if (categoryNewProject === '') {
            array.push('catégorie')
        }
        if (photoNewProject === undefined) {
            array.push('image')
        }

        if (array.length === 0) {
            const inputProjectSubmit = document.querySelector(".input-project-submit")
            inputProjectSubmit.style.backgroundColor = '#1D6154';

            const newProjectData = new FormData();
            newProjectData.append("image", photoNewProject);
            newProjectData.append("title", titleNewProject);
            newProjectData.append("category", categoryNewProject);

            const token = localStorage.getItem("accessToken");
            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: newProjectData
            })
        } else {
            alert("Il manque : " + array.join(", "));
        }
    })
}