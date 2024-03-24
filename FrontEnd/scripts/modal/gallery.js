import { deleteProject } from "./project-delete-handler.js";

// Show projects in modal

export async function showProjectsInModal() {
  const listProjects = JSON.parse(localStorage.getItem("stockedResponse"));

  const modalGallery = document.querySelector(".modal-gallery");
  modalGallery.innerHTML = "";

  for (let i = 0; i < listProjects.length; i++) {
    const urlImg = listProjects[i].imageUrl;
    const imageProject = document.createElement("img");
    imageProject.src = urlImg;

    const iconDeleteProject = document.createElement("i");
    iconDeleteProject.setAttribute("class", "fa-solid fa-trash-can");
    iconDeleteProject.addEventListener("click", (e) => {
      e.preventDefault();
      deleteProject(listProjects[i].id);
    });

    const projectInModal = document.createElement("div");
    projectInModal.setAttribute("class", "project-in-modal");
    projectInModal.setAttribute("id", listProjects[i].id);
    projectInModal.setAttribute("data-work-id", listProjects[i].id);
    projectInModal.append(imageProject);
    projectInModal.append(iconDeleteProject);

    modalGallery.append(projectInModal);
  }
}
