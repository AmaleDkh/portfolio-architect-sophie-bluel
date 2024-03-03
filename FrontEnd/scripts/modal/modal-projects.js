import { deleteProject } from "./project-deleting.js";

// Projects presented in modal

export async function showModalProjects() {
    const url = 'http://localhost:5678/api/works';
    const response = await fetch(url).then(response => response.json());

    for (let i = 0; i < response.length; i++) {
        const projectImageUrl = response[i].imageUrl;

        const imageProject = document.createElement("img");
        imageProject.src = projectImageUrl;

        const iconDeleteProject = document.createElement("i");
        iconDeleteProject.setAttribute("class", "fa-solid fa-trash-can");

        const projectInModal = document.createElement("div");
        projectInModal.setAttribute("class", "project-in-modal");
        projectInModal.setAttribute("id", response[i].id);
        projectInModal.append(imageProject);
        projectInModal.append(iconDeleteProject);

        const divShowProjectModal = document.querySelector(".modal-gallery");
        divShowProjectModal.append(projectInModal);

        iconDeleteProject.addEventListener("click", (e) => {
            e.preventDefault();
            deleteProject(response[i].id);
        })
    }
}