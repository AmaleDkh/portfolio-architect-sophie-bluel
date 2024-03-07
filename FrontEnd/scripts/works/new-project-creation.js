import { checkErrorsNewProject } from "../utils/utils.js";
import { hideErrors } from "../utils/utils.js";
import { handleErrors } from "../utils/utils.js";
import { showProjects } from "../gallery/gallery.js";
import { showModalProjects } from "../modal/modal-gallery.js";

// New project adding

export function addNewProject() {
    const submitForm = document.querySelector(".modal-form");
    submitForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const titleNewProject = document.querySelector("#project-title").value;
        const categoryNewProject = document.querySelectorAll("#project-category option:checked")[0].id;
        const photoNewProject = document.querySelector(".input-add-new-photo").files[0];

        const errors = checkErrorsNewProject(photoNewProject, titleNewProject, categoryNewProject);

        if (errors.length === 0) {
            const responseData = await handleSubmit(photoNewProject, titleNewProject, categoryNewProject);
            updateListProjects(responseData);
        } else {
            handleErrors(errors);

            const faImage = document.querySelector(".fa-image");
            faImage.style.paddingTop = "8px";
            const selectCategory = document.querySelector("#project-category");
            selectCategory.style.marginBottom = "0";
            const inputProjectSubmit = document.querySelector(".input-project-submit");
            inputProjectSubmit.style.marginTop = "38px";
        }
        document.addEventListener("click", () => {
            hideErrors();
        }, true);
    })
}

// Create a new project and validate form

async function handleSubmit(photo, title, category) {
    const inputProjectSubmit = document.querySelector(".input-project-submit");
    inputProjectSubmit.style.backgroundColor = '#1D6154';

    const newProjectData = new FormData();
    newProjectData.append("image", photo);
    newProjectData.append("title", title);
    newProjectData.append("category", category);

    const token = localStorage.getItem("accessToken");
    const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: newProjectData
    })
    return response.json();
}

// Update projects list in local storage

function updateListProjects(responseData) {
    const listProjects = JSON.parse(localStorage.getItem("stockedResponse"));
    listProjects.push(responseData);
    localStorage.setItem("stockedResponse", JSON.stringify(listProjects));
    showProjects(listProjects);
    showModalProjects(listProjects);
}