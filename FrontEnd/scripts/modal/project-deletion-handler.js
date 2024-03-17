import { showProjects } from "../gallery/gallery.js";
import { handleAlerts } from "../alerts.js/alerts-handler.js";

// Projects deleting

export async function deleteProject(id) {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        return
    }

    const projectInPortfolio = document.querySelector(`[data-work-id="${id}"]`);

    if (!projectInPortfolio) {
        handleAlerts("error", "Échec lors de suppression", "Une erreur s'est produite. Veuillez réessayer.", false, "", false, "", true, 6000);
        return
    }

    projectInPortfolio.remove();
    const listProjects = JSON.parse(localStorage.getItem("stockedResponse"));
    const updatedListProjects = listProjects.filter(project => project.id !== id);
    localStorage.setItem("stockedResponse", JSON.stringify(updatedListProjects));
    showProjects(updatedListProjects);

    const result = await handleAlerts("warning", "Êtes-vous sûr.e ?", "Le projet sera supprimé définitivement.", true, "Valider", true, "Annuler", false);
    if (result.isConfirmed) {
        await handleAlerts("success", "Projet supprimé", "", false, "", false, "", true, 6000);
    }
}