import { deleteProject } from "./project-deleting.js";

// Projects presented in modal

export async function showModalProjects() {
    const listProjects = JSON.parse(localStorage.getItem("stockedResponse"));

    const divShowProjectModal = document.querySelector(".modal-gallery");
    divShowProjectModal.innerHTML = '';

    for (let i = 0; i < listProjects.length; i++) {
        const projectImageUrl = listProjects[i].imageUrl;

        const imageProject = document.createElement("img");
        imageProject.src = projectImageUrl;

        const iconDeleteProject = document.createElement("i");
        iconDeleteProject.setAttribute("class", "fa-solid fa-trash-can");

        const projectInModal = document.createElement("div");
        projectInModal.setAttribute("class", "project-in-modal");
        projectInModal.setAttribute("id", listProjects[i].id);
        projectInModal.setAttribute("data-work-id", listProjects[i].id);
        projectInModal.append(imageProject);
        projectInModal.append(iconDeleteProject);

        const divShowProjectModal = document.querySelector(".modal-gallery");
        divShowProjectModal.append(projectInModal);

        iconDeleteProject.addEventListener("click", (e) => {
            e.preventDefault();
            deleteProject(listProjects[i].id);
        })
    }
}