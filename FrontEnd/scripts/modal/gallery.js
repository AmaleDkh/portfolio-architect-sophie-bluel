import { deleteProject } from "./project-delete-handler.js";

// Projects presented in modal

export async function showModalProjects() {
    const listProjects = JSON.parse(localStorage.getItem("stockedResponse"));

    const divModalWithGallery = document.querySelector(".modal-gallery");
    divModalWithGallery.innerHTML = '';

    for (let i = 0; i < listProjects.length; i++) {
        const imgUrlProject = listProjects[i].imageUrl;

        const imageProject = document.createElement("img");
        imageProject.src = imgUrlProject;

        const iconDeleteProject = document.createElement("i");
        iconDeleteProject.setAttribute("class", "fa-solid fa-trash-can");

        iconDeleteProject.addEventListener("click", (e) => {
            e.preventDefault();
            deleteProject(listProjects[i].id);
        })

        const projectInModal = document.createElement("div");
        projectInModal.setAttribute("class", "project-in-modal");
        projectInModal.setAttribute("id", listProjects[i].id);
        projectInModal.setAttribute("data-work-id", listProjects[i].id);
        projectInModal.append(imageProject);
        projectInModal.append(iconDeleteProject);

        divModalWithGallery.append(projectInModal);  
    }
}