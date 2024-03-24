import { fetchNewProject } from "../api-requests/api-requests.js";
import { showProjects } from "../gallery/gallery.js";
import { showProjectsInModal } from "../modal/gallery.js";
import {
  checkErrorsNewProject,
  hideErrors,
  handleErrors,
} from "../utils/errors.js";
import { showAlert } from "../utils/alerts.js";

// Add new project

export function addNewProject() {
  const modalForm = document.querySelector(".modal-form");
  modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titleNewProject = document.querySelector("#project-title").value;
    const categoryNewProject = document.querySelectorAll(
      "#project-category option:checked",
    )[0].id;
    const photoNewProject = document.querySelector(".input-add-new-photo")
      .files[0];

    const errors = checkErrorsNewProject(
      photoNewProject,
      titleNewProject,
      categoryNewProject,
    );

    if (errors.length !== 0) {
      handleErrors(errors);

      document.addEventListener(
        "click",
        () => {
          hideErrors();
        },
        true,
      );

      return;
    }

    const newProjectData = new FormData();
    newProjectData.append("image", photoNewProject);
    newProjectData.append("title", titleNewProject);
    newProjectData.append("category", categoryNewProject);

    try {
      const responseNewProject = await fetchNewProject(newProjectData);

      showAlert(
        "success",
        "Nouveau projet ajouté",
        "",
        false,
        "",
        false,
        "",
        true,
        6000,
      );

      updateListProjects(responseNewProject);
    } catch {
      showAlert(
        "error",
        "Échec lors de l'ajout",
        "Une erreur s'est produite. Veuillez réessayer.",
        false,
        "",
        false,
        "",
        true,
        6000,
      );
    }
  });
}

// Update list projects in local storage

function updateListProjects(response) {
  const listProjects = JSON.parse(localStorage.getItem("stockedResponse"));
  listProjects.push(response);
  localStorage.setItem("stockedResponse", JSON.stringify(listProjects));
  showProjects(listProjects);
  showProjectsInModal(listProjects);
}
