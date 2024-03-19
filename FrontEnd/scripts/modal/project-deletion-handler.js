import { fetchDeleteProject } from "../api-requests/api-requests.js";
import { showProjects } from "../gallery/gallery.js";
import { handleAlerts } from "../utils/alerts.js";

// Delete project

export async function deleteProject(id) {
    try {
        const result = await handleAlerts(
            "warning",
            "Êtes-vous sûr.e ?",
            "Le projet sera supprimé définitivement.",
            true,
            "Valider",
            true,
            "Annuler",
            false
        );

        if (!result.isConfirmed) {
            return
        }

        await fetchDeleteProject(id);

        const projectInPortfolio = document.querySelector(`[data-work-id="${id}"]`);
        projectInPortfolio.remove();

        const listProjects = JSON.parse(localStorage.getItem("stockedResponse"));
        const updatedListProjects = listProjects.filter(project => project.id !== id);
        localStorage.setItem("stockedResponse", JSON.stringify(updatedListProjects));

        showProjects(updatedListProjects);

        await handleAlerts(
            "success",
            "Projet supprimé",
            "",
            false,
            "",
            false,
            "",
            true,
            6000
        );

    } catch {
        handleAlerts(
            "error",
            "Échec lors de suppression",
            "Une erreur s'est produite. Veuillez réessayer.",
            false,
            "",
            false,
            "",
            true,
            6000
        );
    }
}